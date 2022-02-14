sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    BaseController,
    LayoutType,
    JSONModel,
    formatters,
    Filter,
    FilterOperator,
    Fragment
  ) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Charges", {
      formatter: formatters,

      onInit: function () {
        var viewModel = new JSONModel({
          title: "",
          editLobDialog: {
            title: "",
            busy: false,
          },
          modes: {
            create: false,
            edit: false,
            displayWithDraft: false,
            displayWithoutDraft: false,
          },
          editable: false,
        });

        this.setModel(viewModel, "detailsViewModel");

        var dataModel = new JSONModel({
          header: {},
        });

        this.setModel(dataModel, "detailsModel");

        var self = this;

        this.getRouter()
          .getRoute("Charges")
          .attachPatternMatched(this._onObjectMatched, this);

        this._hashHandler = (function () {
          var sCurrentHash;

          var fnHandleHashChange = function (e) {
            var sOldHash = e.oldURL.substr(e.oldURL.search("#") + 1);
            var sNewHash = e.newURL.substr(e.newURL.search("#") + 1);

            if (sCurrentHash !== sOldHash) {
              return;
            }

            if (confirm("Are you sure you want to navigate away?")) {
              // exit page
              window.removeEventListener("hashchange", fnHandleHashChange);
              window.hasher.setHash(sOldHash.substr(1));
              window.hasher.changed.active = true;
              window.hasher.setHash(sNewHash.substr(1));
              self._getViewModel().setProperty("/editable", false);
            } else {
              // stay on the current page
              window.hasher.setHash(sOldHash.substr(1));
            }
          };

          return {
            startManualHashChangeHandling: function () {
              sCurrentHash = window.location.hash.substr(1);
              window.hasher.changed.active = false;
              window.addEventListener("hashchange", fnHandleHashChange);
            },
            stopManualHashChangeHandling: function () {
              window.hasher.changed.active = true;
              window.removeEventListener("hashchange", fnHandleHashChange);
            },
          };
        })();
      },
      _getDataModel: function () {
        return this.getModel("detailsModel");
      },
      _getViewModel: function () {
        return this.getModel("detailsViewModel");
      },
      _onObjectMatched: function (oEvent) {
        // clear data model
        this._getDataModel().setProperty("/header", {});
        this.routeParams = oEvent.getParameter("arguments");
        this.getEventBus().publish(
          "route",
          "charges",
          oEvent.getParameter("arguments")
        );

        this.getModel("appView").setProperty(
          "/layout",
          LayoutType.TwoColumnsMidExpanded
        );

        // TODO:

        this.loadData(oEvent.getParameter("arguments").vid);

        this._hashHandler.startManualHashChangeHandling();

        // if (this.routeParams.vid !== "new") {
        //   this.loadData(oEvent.getParameter("arguments").vid);
        //   this._getViewModel().setProperty("/editMode", false);
        //   this.getModel("appView").setProperty("/mainTabsVisible", true);
        // } else {
        //   this.getModel("appView").setProperty("/mainTabsVisible", false);
        //   this._getViewModel().setProperty("/editMode", true);
        //   this._getViewModel().setProperty(
        //     "/title",
        //     this.getResourceBundle().getText("newContract")
        //   );
        //   var contractItemModel = this._setupEditedContractModel();
        // //   this._saveDraftContract(contractItemModel.getData());
        //   this._hashHandler.startManualHashChangeHandling();
        // }
      },

      loadData: function (id) {
        const sUrl = this.getModel().sServiceUrl + "PurDocs";
        var self = this;
        self.showBusyIndicator(true);

        $.get({
          url: sUrl,
          data: {
            $select: "IsActiveEntity",
            $filter: `ID eq ${id} and (IsActiveEntity eq false or SiblingEntity/IsActiveEntity eq null)`,
          },
          success: function (data) {
            if (data && data.value.length > 0) {
              self.loadContract(id, data.value[0].IsActiveEntity);
            }
          },
          error: function (error) {
            console.log(error);
            self.showBusyIndicator(false);
          },
        });
      },
      loadContract: function (id, isActiveEntity) {
        var oModel = this.getModel("detailsModel");
        const sUrl = this.getModel().sServiceUrl + "PurDocs";
        var self = this;

        $.get({
          url: `${sUrl}(ID=${id},IsActiveEntity=${isActiveEntity})`,
          data: {
            $select:
              "extenalID,documentDate,description,status,validFrom,validTo,aribaIndicator",
            $expand:
              "vendor,carrier,purchaseOrganization,items,status,DraftAdministrativeData",
          },
          success: function (data) {
            var header = _.cloneDeep(data);

            header.airportCharges = [];
            header.cargos = [];
            header.engs = [];
            header.caterings = [];

            if (data && data.items) {
              // loop on the items and group them by line of business
              data.items.forEach(function (item) {
                if (item.lineOfBusiness === "airport") {
                  header.airportCharges.push(item);
                } else if (item.lineOfBusiness === "cargo") {
                  header.cargos.push(item);
                }
              });
            }

            header.items = header.airportCharges;

            oModel.setProperty("/header", header);

            var contractText = self.getResourceBundle().getText("contract");
            self
              .getModel("detailsViewModel")
              .setProperty(
                "/title",
                `${contractText} ${data.extenalID} (${data.description})`
              );

            self.showBusyIndicator(false);
            self._updateFormMode(data);
          },
          error: function (err) {
            self.showBusyIndicator(false);
          },
        });
      },

      _updateFormMode: function (data) {
        var createMode =
          data.DraftAdministrativeData &&
          data.DraftAdministrativeData.DraftIsCreatedByMe &&
          !data.IsActiveEntity &&
          !data.HasActiveEntity &&
          !data.HasDraftEntity;

        var editMode =
          data.DraftAdministrativeData &&
          data.DraftAdministrativeData.DraftIsCreatedByMe &&
          !data.IsActiveEntity &&
          data.HasActiveEntity &&
          !data.HasDraftEntity;

        var displayModeWithDraft =
          data.DraftAdministrativeData &&
          !data.DraftAdministrativeData.DraftIsCreatedByMe &&
          data.IsActiveEntity &&
          !data.HasActiveEntity &&
          data.HasDraftEntity;

        var displayModeWithoutDraft =
          !data.DraftAdministrativeData &&
          data.IsActiveEntity &&
          !data.HasDraftEntity &&
          data.HasDraftEntity;

        this._getViewModel().setProperty("/modes", {
          create: createMode,
          edit: editMode,
          displayWithDraft: displayModeWithDraft,
          displayWithoutDraft: displayModeWithoutDraft,
        });

        this._getViewModel().setProperty("/editable", createMode || editMode);

        if (createMode || editMode) {
          this._setupEditedContractModel(data);
        }
      },

      vendorOnSuggest: function (event) {
        var sValue = event.getParameter("suggestValue"),
          aFilters = [];
        if (sValue) {
          aFilters = [
            new Filter(
              [
                new Filter("ID", FilterOperator.StartsWith, sValue),
                new Filter("Name", FilterOperator.StartsWith, sValue),
              ],
              false
            ),
          ];
        }

        event.getSource().getBinding("suggestionItems").filter(aFilters);
        event.getSource().suggest();
      },
      onCancelCreate: function () {
        this.onNavBack("Vendors");
      },
      onSaveContract: function () {
        this.activateDraft();
      },
      activateDraft: function (action = "smartDOCDraft.draftPrepare") {
        var oDataModel = this._getDataModel();

        var contractId = oDataModel.getProperty("/header/ID");
        var isActiveEntity = oDataModel.getProperty("/header/IsActiveEntity");

        var sUrl = `${
          this.getModel().sServiceUrl
        }PurDocs(ID=${contractId},IsActiveEntity=${isActiveEntity})/${action}`;

        var self = this;

        $.ajax({
          url: sUrl,
          type: "POST",
          data: JSON.stringify({ SideEffectsQualifier: "" }),
          headers: {
            "Content-Type": "application/json;IEEE754Compatible=true",
          },
          dataType: "json",
          success: function (data) {
            if (action === "smartDOCDraft.draftPrepare") {
              self.activateDraft("smartDOCDraft.draftActivate");
            }
          },
          error: function (error) {
            alert("error");
            console.log(error);
          },
        });
      },
      onLobTabSelected: function (oEvent) {
        var oModel = this.getModel("detailsModel");
        var oHeader = oModel.getProperty("/header");
        var sSelectedKey = oEvent.getParameter("selectedKey");

        oModel.setProperty("/header/items", oHeader[sSelectedKey]);
      },
      onBrfButtonPressed: function (oEvent) {
        var oListItem = oEvent.getSource().getParent();
        var sPath = oListItem.getBindingContextPath();

        // get the item from the model
        var oItem = this.getModel("detailsModel").getProperty(sPath);

        const RESOURCES = {
          MD_APP_BASE_URL: "BusinessRules-ManageDecision&/RuleServices",
          REVISIONS: "Revisions",
        };

        var sShellHashURL = RESOURCES.MD_APP_BASE_URL + "/" + oItem.brf_id;

        var xnaservice =
          sap.ushell &&
          sap.ushell.Container &&
          sap.ushell.Container.getService &&
          sap.ushell.Container.getService("CrossApplicationNavigation");

        xnaservice.toExternal({
          target: {
            shellHash: sShellHashURL,
          },
        });
      },
      _setupEditedContractModel: function (data) {
        var editedContractModel = new JSONModel({
          contractItem: null,
          statusCode: data.status ? data.status.code : "",
          description: data.description,
          docDate: data.documentDate,
          validFromDate: data.validFrom,
          validToDate: data.validTo,
          carrierId: data.carrier_ID,
          purchaseOrgId: data.purchaseOrganization_ID,
          vendorId: data.vendor_ID,
        });

        this.getView().setModel(editedContractModel, "editedContract");

        editedContractModel.attachPropertyChange(function () {
          var oItem = this.getView().getModel("editedContract").getData();
          this._saveDraftContract(data.ID, data.IsActiveEntity, oItem);
        }, this);

        return editedContractModel;
      },
      _saveDraftContract: function (contractId, isActiveEntity, contractItem) {
        var sUrl = `${
          this.getModel().sServiceUrl
        }PurDocs(ID=${contractId},IsActiveEntity=${isActiveEntity})`;
        var method = "PATCH";
        var oContractItemModel = this.getView().getModel("editedContract");

        const payload = {
          validFrom: contractItem.validFromDate
            ? contractItem.validFromDate
            : "1900-01-01T00:00:00.000Z",
          validTo: contractItem.validToDate
            ? contractItem.validToDate
            : "1900-01-01T00:00:00.000Z",
          objectType: "contract",
          documentDate: contractItem.docDate
            ? `${contractItem.docDate}`
            : "1900-01-01",
          description: contractItem.description,
          airport_ID: this.routeParams.id,
          status_code: contractItem.statusCode,
          carrier_ID: contractItem.carrierId,
          purchaseOrganization_ID: contractItem.purchaseOrgId,
          documentType: "airport",
          vendor_ID: contractItem.vendorId,
          aribaIndicator: null,
        };

        $.ajax({
          url: sUrl,
          type: method,
          data: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json;IEEE754Compatible=true",
          },
          dataType: "json",
          success: function (data) {
            oContractItemModel.setProperty("/contractItem", data);
          },
          error: function (error) {
            console.log(error);
          },
        });
      },
      onAddLobItem: function () {
        var self = this;

        this._getViewModel().setProperty("/editLobDialog/title", "Create Item");

        var oEditLobModel = new JSONModel({
          status: "",
          description: "",
          validFrom: "",
          validTo: "",
          price: undefined,
          quantity: undefined,
        });

        this.getView().setModel(oEditLobModel, "editLobData");

        Fragment.load({
          name: "airportprofile.fragments.editLob",
          controller: this,
        }).then(function (oDialog) {
          self._editLobDialog = oDialog;
          self.getView().addDependent(oDialog);
          oDialog.open();
        });
      },
      onSaveLob: function () {
        var contractItem = this._getDataModel().getProperty("/header");

        var sUrl = `${this.getModel().sServiceUrl}PurDocs(ID=${
          contractItem.ID
        },IsActiveEntity=${contractItem.IsActiveEntity})/items`;

        var editedItem = this.getView().getModel("editLobData").getData();

        var payload = {
          validFrom: `${editedItem.validFrom}T00:00:00.000Z`,
          validTo: `${editedItem.validTo}T00:00:00.000Z`,
        };

        $.ajax({
          url: sUrl,
          type: "POST",
          data: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json;IEEE754Compatible=true",
          },
          dataType: "json",
          success: function (data) {
            // oContractItemModel.setProperty("/contractItem", data);
            alert("success");
          },
          error: function (error) {
            alert("error");
          },
        });
      },

      onCloseEditLobDialog: function () {
        if (this._editLobDialog) {
          this._editLobDialog.close();
          this._editLobDialog.destroy();
          this._editLobDialog = null;
        }
      },
    });
  }
);
