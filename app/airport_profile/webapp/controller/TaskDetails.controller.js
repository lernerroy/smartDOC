sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/ListItem",
    "sap/m/MessageBox",
    "../utils/draftUtils",
    "sap/m/MessagePopover",
    "sap/m/MessagePopoverItem",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    BaseController,
    LayoutType,
    JSONModel,
    formatters,
    Fragment,
    Filter,
    FilterOperator,
    ListItem,
    MessageBox,
    draftUtils,
    MessagePopover,
    MessagePopoverItem
  ) {
    "use strict";

    return BaseController.extend("airportprofile.controller.TaskDetails", {
      formatter: formatters,

      onInit: function () {
        var viewModel = new JSONModel({
          title: this.getResourceBundle().getText("airportProfileTitle"),
          selectedTabKey: "airport",
          currentLocationText: "",
          icon: "",
          draftMode: false,
          modes: {
            create: false,
            edit: false,
            displayWithDraft: false,
            displayWithoutDraft: false,
            locked: false,
          },
          domesticIntlItems: [
            {
              code: "I",
              name: "International",
            },
            {
              code: "D",
              name: "Domestic",
            },
          ],
        });

        this.setModel(viewModel, "taskDetailsViewModel");

        this.getRouter()
          .getRoute("TaskDetails")
          .attachPatternMatched(this._onObjectMatched, this);

        this.getRouter()
          .getRoute("Services")
          .attachPatternMatched(this._onObjectMatched, this);

        var self = this;

        this._hashHandler = (function () {
          var sCurrentHash;

          var fnHandleHashChange = function (e) {
            var sOldHash = e.oldURL.substr(e.oldURL.search("#") + 1);
            var sNewHash = e.newURL.substr(e.newURL.search("#") + 1);

            if (sCurrentHash !== sOldHash) {
              return;
            }

            // show draft save dialog only when we're in edit mode
            if (self._getViewModel().getProperty("/draftMode")) {
              window.hasher.setHash(sOldHash.substr(1));
              if (self.formChanged) {
                self.onCancelVersionDraft(sNewHash);
              }
            } else {
              window.removeEventListener("hashchange", fnHandleHashChange);
              window.hasher.setHash(sOldHash.substr(1));
              window.hasher.changed.active = true;
              window.hasher.setHash(sNewHash.substr(1));
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

      navToAirports: function () {
        this.getRouter().navTo("Airports", {}, true);
      },
      /* Events */
      onEditVersionPressed: function () {
        var oOperation = this.getModel().bindContext(
          "smartDOCDraft.draftEdit(...)",
          this.oVersionContext
        );

        var self = this;

        oOperation
          .execute()
          .then(
            function (oContext) {
              self.loadVersions(
                self.routeParams.type,
                self.routeParams.id,
                oContext
              );
            }.bind(this)
          )
          .catch(function (err) {
            var message = err.message;
            if (!message && err.responseJSON) {
              message = err.responseJSON.error.message;
            }
            self.showMessageDialog("Error", message);
          });
      },
      onDeleteVersionPressed: function () {
        var oItem = this.oVersionContext.getObject();
        var lv_message = `Delete the object ${oItem.extenalID} (${oItem.description})`;

        var self = this;
        MessageBox.warning(lv_message, {
          actions: ["Delete", MessageBox.Action.CANCEL],
          emphasizedAction: "Delete",
          onClose: function (sAction) {
            if (sAction === "Delete") {
              self._deleteContext(self.oVersionContext);
            }
          },
        });
      },
      _deleteContext: function (oContext) {
        var self = this;
        oContext
          .delete()
          .then(function () {
            self.loadVersions(self.routeParams.type, self.routeParams.id);
          })
          .catch(function (err) {
            self.showMessageDialog("Error", err.responseJSON.error.message);
          });
      },
      /* End of Events */
      _onObjectMatched: function (oEvent) {
        var oRouteParams = oEvent.getParameter("arguments");
        this.routeParams = oRouteParams;
        var routeName = oEvent.getParameter("name");

        this.getModel("appView").setProperty("/mainTabsVisible", true);

        this.getModel("appView").setProperty(
          "/currentAirportId",
          this.routeParams.id
        );

        this.getModel("appView").setProperty(
          "/currentSelectedTabKey",
          oRouteParams.type
        );
        if (routeName !== "Services") {
          this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
        } else {
          var oTable = this.getView().byId("lobTableItems");
          oTable.attachUpdateFinished(
            null,
            function () {
              var oItems = oTable.getItems();
              var itemToSelectId = this.routeParams.lobItemId;
              // find the item we need to select
              var oItemToSelect = oItems.find(function (oItem) {
                var object = oItem.getBindingContext().getObject();
                if (object.ID === itemToSelectId) {
                  return oItem;
                }
              });
              if (oItemToSelect) {
                oItemToSelect.setSelected(true);
              } else {
                this._hashHandler.stopManualHashChangeHandling();
                this.onNavBack("TaskDetails");
              }
            },
            this
          );
        }

        if (this.oVersionContext && routeName === "Services") {
          return;
        }

        this.loadVersions(oRouteParams.type, oRouteParams.id);
      },
      _updateFormMode: function (data) {
        var currentUser = "";
        if (sap.ushell) {
          currentUser = sap.ushell.Container.getUser().getEmail();
        }

        var createMode =
          data.DraftAdministrativeData &&
          data.DraftAdministrativeData.DraftIsCreatedByMe &&
          !data.IsActiveEntity &&
          !data.HasActiveEntity &&
          !data.HasDraftEntity
            ? true
            : false;

        var editMode =
          data.DraftAdministrativeData &&
          data.DraftAdministrativeData.DraftIsCreatedByMe &&
          !data.IsActiveEntity &&
          data.HasActiveEntity &&
          !data.HasDraftEntity
            ? true
            : false;

        var displayModeWithDraft =
          data.DraftAdministrativeData &&
          !data.DraftAdministrativeData.DraftIsCreatedByMe &&
          data.IsActiveEntity &&
          !data.HasActiveEntity &&
          data.HasDraftEntity
            ? true
            : false;

        var displayModeWithoutDraft =
          !data.DraftAdministrativeData &&
          data.IsActiveEntity &&
          !data.HasDraftEntity &&
          data.HasDraftEntity
            ? true
            : false;

        var isLocked =
          data.IsActiveEntity &&
          data.HasDraftEntity &&
          data.DraftAdministrativeData.LastChangedByUser !== currentUser &&
          data.DraftAdministrativeData.InProcessByUser
            ? true
            : false;

        this._getViewModel().setProperty("/modes", {
          create: createMode,
          edit: editMode,
          displayWithDraft: displayModeWithDraft,
          displayWithoutDraft: displayModeWithoutDraft,
          locked: isLocked,
        });

        this._getViewModel().setProperty("/draftMode", createMode || editMode);
        if (createMode || editMode) {
          this.formChanged = true;
          this._hashHandler.startManualHashChangeHandling();
        } else {
          this._hashHandler.stopManualHashChangeHandling();
        }
      },
      _getViewModel: function () {
        return this.getModel("taskDetailsViewModel");
      },
      _getDataModel: function () {
        return this.getModel("taskDetailsDataModel");
      },
      _getServicesDataModel: function () {
        return this.getModel("servicesDialogModel");
      },
      _clearServicesDataModel: function () {
        var oModel = this._getServicesDataModel();
        oModel.setProperty("/busy", false);
        oModel.setProperty("/services", []);
        oModel.setProperty("/title", "");
      },

      onMessagesIndicatorPressed: function (oEvent) {
        var oMessagesButton = oEvent.getSource();

        if (!this._messagePopover) {
          this._messagePopover = new MessagePopover({
            items: {
              path: "message>/",
              template: new MessagePopoverItem({
                description: "{message>description}",
                type: "{message>type}",
                title: "{message>message}",
              }),
            },
          });
          oMessagesButton.addDependent(this._messagePopover);
        }

        this._messagePopover.toggle(oMessagesButton);
      },

      loadVersions: function (type, airportId, oSelectedContext = null) {
        var aFilters = [];

        if (type === "arr") {
          aFilters.push(
            new Filter({
              path: "destination_ID",
              operator: FilterOperator.EQ,
              value1: airportId,
            })
          );
        } else if (type === "dep") {
          aFilters.push(
            new Filter({
              path: "origin_ID",
              operator: FilterOperator.EQ,
              value1: airportId,
            })
          );
        }

        aFilters.push(
          new Filter({
            filters: [
              new Filter({
                path: "IsActiveEntity",
                operator: FilterOperator.EQ,
                value1: false,
              }),
              new Filter({
                path: "SiblingEntity/IsActiveEntity",
                operator: FilterOperator.EQ,
                value1: null,
              }),
            ],
            and: false,
          })
        );

        var oCombobox = this.getView().byId("versionsComboBox");

        var self = this;

        oCombobox.clearSelection();

        oCombobox.bindItems({
          path: "/TaskLists",
          filters: aFilters,
          parameters: {
            "sap-valid-from": "date'1900-01-01'",
            "sap-valid-to": "date'9999-12-31'",
            $expand: "DraftAdministrativeData,status",
            $select: "HasDraftEntity",
          },
          template: new ListItem({
            key: "{ID}",
            text: {
              parts: [
                {
                  path: "validFrom",
                  formatter: function (dateString) {
                    return this.formatter.convertDate(dateString) + " - ";
                  }.bind(this),
                },
                {
                  path: "validTo",
                  formatter: this.formatter.convertDate,
                },
              ],
            },
            additionalText: {
              path: "IsActiveEntity",
              formatter: function (isActiveEntity) {
                if (isActiveEntity === "No") {
                  return "Draft";
                } else {
                  return "";
                }
              }.bind(this),
            },
            //   "{path: 'validFrom', formatter: 'formatter.convertDate'} - {path: 'validTo', formatter: 'formatter.convertDate'}",
          }),
          events: {
            dataReceived: function (oEvent) {
              var aContexts = oEvent.getSource().getContexts();
              if (aContexts && aContexts.length > 0) {
                var oContext = null;
                // if selected context sent, we need to find it in the
                // list and select it. Otherwise, we will select the first
                // context in the list
                if (oSelectedContext) {
                  oContext = aContexts.find((ctx) => {
                    if (ctx.sPath === oSelectedContext.sPath) {
                      return ctx;
                    }
                  });
                } else {
                  oContext = aContexts[0];
                }
                var oItem = oContext.getObject();
                self.oVersionContext = oContext;
                oCombobox.setSelectedKey(oItem.ID);
                self._bindView(oContext);
                self._bindLobTableItems(oContext);
                self._updateFormMode(oItem);
              } else {
                self.oVersionContext = null;
                self.getView().unbindElement();
              }
            },
          },
        });
      },
      _bindView: function (oContext) {
        this.getView().bindElement({
          path: oContext.getPath(),
        });
      },
      _unbindLobTableItems: function () {
        var oTable = this.getView().byId("lobTableItems");
        oTable.unbindItems();
      },
      _bindLobTableItems: function (oContext) {
        var oTable = this.getView().byId("lobTableItems");
        var oListBinding = oTable.getBinding("items");
        var key = this._getViewModel().getProperty("/selectedTabKey");
        oListBinding.filter(
          new Filter({
            path: "lineOfBusiness",
            operator: FilterOperator.EQ,
            value1: key,
          })
        );
      },
      onAddNewVersionClicked: function () {
        var self = this;

        var oVersionModel = new JSONModel({
          title: "New Version",
          busy: false,
          validFromDate: "",
          validToDate: "",
        });

        self.getView().setModel(oVersionModel, "newVersionModel");

        Fragment.load({
          id: self.getView().getId(),
          name: "airportprofile.fragments.createVersion",
          controller: this,
        }).then(function (oDialog) {
          self._newVersionDialog = oDialog;
          self.getView().addDependent(oDialog);
          oDialog.open();
          oDialog.attachAfterClose(
            null,
            function (oEvent) {
              oEvent.getSource().destroy();
              self.getView().setModel(null, "newVersionModel");
            },
            this
          );
        });
      },
      onAddLobItem: function () {
        var oTable = this.getView().byId("lobTableItems");
        var oListBinding = oTable.getBinding("items");
        var key = this._getViewModel().getProperty("/selectedTabKey");

        oListBinding.create(
          {
            extenalID: "00010",
            validFrom: moment(new Date(), "YYYY-MM-DD HH:mm:ss.SS"),
            validTo: moment("9999-12-31", "YYYY-MM-DD HH:mm:ss.SS"),
            IsActiveEntity: true,
            additionalIndicator: true,
            status_code: "A",
            serviceType_code: "",
            domesticIntl_code: "",
            lineOfBusiness: key,
            jobIndicator: true,
            description: undefined,
          },
          false,
          false,
          false
        );

        oDataListBinding.attachCreateCompleted(function (oEvent) {
          //   this.getModel().refresh();
        }, this);
      },
      onCloseVersionDialog: function () {
        this._newVersionDialog.close();
      },
      onCreateVersionClicked: function (oEvent) {
        var oDialog = oEvent.getSource().getParent();
        var oDataModel = this.getView().getModel("newVersionModel");
        var sValidFromDate = oDataModel.getProperty("/validFromDate");
        var sValidToDate = oDataModel.getProperty("/validToDate");

        if (!sValidFromDate || !sValidToDate) {
          return;
        }

        var payload = {
          validFrom: moment(sValidFromDate, "YYYY-MM-DD HH:mm:ss.SS"),
          validTo: moment(sValidToDate, "YYYY-MM-DD HH:mm:ss.SS"),
        };

        if (this.routeParams.type === "arr") {
          payload.destination_ID = this.routeParams.id;
        } else if (this.routeParams.type === "dep") {
          payload.origin_ID = this.routeParams.id;
        }

        var oDataListBinding = this.getModel().bindList("/TaskLists");
        oDataModel.setProperty("/busy", true);

        oDataListBinding.create(payload);
        var self = this;
        oDataListBinding.attachCreateCompleted(function (oEvent) {
          oDataModel.setProperty("/busy", false);
          oDialog.close();
          var oContext = oEvent.getParameter("context");
          self.loadVersions(
            self.routeParams.type,
            self.routeParams.id,
            oContext
          );
        }, this);
      },
      onSaveVersionDraft: function () {
        var oOperation = this.getModel().bindContext(
          "smartDOCDraft.draftActivate(...)",
          this.oVersionContext
        );

        var self = this;

        // this.oMessageManager.removeAllMessages();

        oOperation.execute().then(
          function (oUpdatedContext) {
            this.oVersionContext = oUpdatedContext;
            this._bindView(oUpdatedContext);
            self._bindLobTableItems(oUpdatedContext);
            self._updateFormMode(oUpdatedContext.getObject());
            var oCombo = self.getView().byId("versionsComboBox");
            oCombo.getBinding("items").refresh();
          }.bind(this)
        );
      },
      onCancelVersionDraft: function (sNewHash = null) {
        var self = this;
        draftUtils.handleDraftSaveChanges(this.getResourceBundle(), {
          onKeepDraft: function () {
            self._getViewModel().setProperty("/draftMode", false);
            if (sNewHash !== null) {
              window.hasher.setHash(sNewHash.substr(1));
            } else {
              self.onNavBack("Airports");
            }
          },
          onDiscardDraft: function () {
            self._deleteContext(self.oVersionContext);
          },
          onCancel: function () {},
        });
      },

      onVersionSelectionChanged: function (oEvent) {
        this.oVersionContext = oEvent
          .getParameter("selectedItem")
          .getBindingContext();

        this._bindView(this.oVersionContext);
        this._updateFormMode(this.oVersionContext.getObject());
      },
      /**
       * Lobs table click handler
       * @param {*} oEvent
       */
      onLobItemPressed: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("listItem");
        var oItem = oSelectedItem.getBindingContext().getObject();

        this.getModel("appView").setProperty(
          "/layout",
          LayoutType.TwoColumnsBeginExpanded
        );

        this._hashHandler.stopManualHashChangeHandling();

        this.getRouter().navTo(
          "Services",
          {
            id: this.routeParams.id,
            type: this.routeParams.type,
            contractId: oItem.purDoc_ID,
            lobItemId: oItem.ID,
            taskId: oItem.up__ID,
          },
          false
        );

        if (this._getViewModel().getProperty("/draftMode")) {
          this._hashHandler.startManualHashChangeHandling();
        }
      },

      onContractIdPressed: function (oEvent) {
        var sPath = oEvent.getSource().getParent().getBindingContextPath();
        var oItem = this._getDataModel().getProperty(sPath);

        var oOpener = oEvent.getSource();
        var self = this;

        if (!this.getModel("contractData")) {
          var oContractDataModel = new JSONModel(oItem.purDoc);
          this.setModel(oContractDataModel, "contractData");
        } else {
          this.getModel("contractData").setData(oItem.purDoc);
          this.getModel("contractData").refresh(true);
        }

        if (!this._contractPopover) {
          this._contractPopover = Fragment.load({
            id: self.getView().getId(),
            name: "airportprofile.fragments.contractPopover",
            controller: this,
          }).then(function (oPopover) {
            self.getView().addDependent(oPopover);
            return oPopover;
          });
        }

        this._contractPopover.then(function (oPopover) {
          oPopover.openBy(oOpener);
        });
      },

      onCloseServicesDialogPressed: function () {
        this.servicesDialog.close();
      },

      onLobTabSelected: function () {
        this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
        this._bindLobTableItems(this.oVersionContext);
      },
      onDeleteLobItem: function (oEvent) {
        var oContext = oEvent
          .getSource()
          .getParent()
          .getParent()
          .getBindingContext();

        oContext.delete();
      },
      onBrfButtonPressed: function (oEvent) {
        var oListItem = oEvent.getSource().getParent();
        var sPath = oListItem.getBindingContextPath();

        // get the item from the model
        var oItem = this.getModel("detailsModel").getProperty(sPath);
      },
    });
  }
);
