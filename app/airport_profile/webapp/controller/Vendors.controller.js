sap.ui.define(
  [
    "./BaseController",
    "sap/ui/core/routing/History",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "sap/ui/Device",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    BaseController,
    History,
    LayoutType,
    JSONModel,
    formatters,
    Device,
    Filter,
    FilterOperator
  ) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Vendors", {
      formatter: formatters,
      onInit: function () {
        var viewModel = new JSONModel({
          airportId: "",
          loading: false,
        });

        this.setModel(viewModel, "vendorsView");

        this.getRouter()
          .getRoute("Vendors")
          .attachPatternMatched(this._onObjectMatched, this);

        this.getRouter()
          .getRoute("Charges")
          .attachPatternMatched(this._onObjectMatched, this);

        var vendorsModel = new JSONModel({
          vendorContracts: [],
        });

        this.setModel(vendorsModel, "vendorContracts");

        this.getEventBus().subscribe(
          null,
          "refreshVendors",
          this.onRefresh,
          this
        );

        this.getEventBus().subscribe(
          null,
          "selectVendorItem",
          function (channel, eventName, data) {
            this._setSelectedListItem(data.id);
          },
          this
        );
      },

      onRefresh: function () {
        this.loadData(this.routeParams.id, this.routeParams.vid);
      },

      _getViewModel: function () {
        return this.getModel("vendorsView");
      },

      _onObjectMatched: function (oEvent) {
        var routeName = oEvent.getParameter("name");
        var oRouteParams = oEvent.getParameter("arguments");
        var airportId = oEvent.getParameter("arguments").id;
        this.routeParams = oRouteParams;

        this.getModel("appView").setProperty("/currentAirportId", airportId);

        this.getModel("vendorsView").setProperty("/airportId", oRouteParams.id);

        if (routeName === "Vendors") {
          this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
          this.getModel("appView").setProperty("/mainTabsVisible", true);
          this.loadData(oRouteParams.id);
        } else if (routeName === "Charges") {
          if (!this.dataLoaded) {
            this.loadData(oRouteParams.id, oRouteParams.vid);
          } else {
            this._setSelectedListItem(oRouteParams.vid);
          }
        }
      },

      navToAirports: function () {
        this.getRouter().navTo("Airports", {}, true);
      },
      onNavBack: function () {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          history.go(-1);
        } else {
          this.navToAirports();
        }
      },
      _setSelectedListItem: function (id) {
        var oModel = this.getModel("vendorContracts");
        var vendors = oModel.getProperty("/vendorContracts");
        vendors.forEach((vendor) => {
          vendor.contracts.forEach((item) => {
            item.selected = item.ID === id;
          });
        });

        oModel.refresh();
      },
      loadData: function (airportId, contractId) {
        var currentUser = "";
        if (sap.ushell) {
          currentUser = sap.ushell.Container.getUser().getEmail();
        }

        var oModel = this.getModel("vendorContracts");
        var self = this;
        const sUrl =
          this.getModel().sServiceUrl +
          "PurDocs?sap-valid-from=date'0001-01-01'";

        this._getViewModel().setProperty("/loading", true);

        var oDataListBinding = this.getModel().bindList(
          "/PurDocs",
          null,
          null,
          null,
          {
            $select: "ID,IsActiveEntity,aribaIndicator,carrier_ID,description,documentDate,extenalID,purchaseOrganization_ID,status_code,validFrom,validTo,vendor_ID",
            $expand: "status,DraftAdministrativeData,vendor",
          }
        );

        oDataListBinding.filter([
          new Filter({
            path: "airport_ID",
            operator: FilterOperator.EQ,
            value1: airportId,
          }),
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
          }),
        ]);

        oDataListBinding
          .requestContexts(0, 500)
          .then(
            function (aContexts) {
              self.dataLoaded = true;
              var items = aContexts.map((context) => context.getObject());
              var vendors = [];
              items.forEach(function (item) {
                item.selected = item.ID === contractId;
                item.inProcessByMe =
                  item.DraftAdministrativeData &&
                  item.DraftAdministrativeData.InProcessByUser === currentUser;

                item.showDraftIndicator =
                  (!item.IsActiveEntity && !item.HasDraftEntity) ||
                  (item.IsActiveEntity &&
                    item.HasDraftEntity &&
                    item.DraftAdministrativeData.LastChangedByUser ===
                      currentUser);

                item.showUnsavedChangesIndicator =
                  item.IsActiveEntity &&
                  item.HasDraftEntity &&
                  item.DraftAdministrativeData.LastChangedByUser !==
                    currentUser;

                if (item.showUnsavedChangesIndicator) {
                  item.draftLastChangedByText = `${self.getResourceBundle().getText(
                    "unsavedChangesBy"
                  )} ${item.DraftAdministrativeData.LastChangedByUser}`;
                }

                item.showLockedIndicator =
                  item.IsActiveEntity &&
                  item.HasDraftEntity &&
                  item.DraftAdministrativeData.LastChangedByUser !==
                    currentUser &&
                  item.DraftAdministrativeData.InProcessByUser;

                if (item.showLockedIndicator) {
                  item.lockedText = `${self.getResourceBundle().getText(
                    "lockedBy"
                  )} ${item.DraftAdministrativeData.LastChangedByUser}`;
                }

                // check if vendor id already exists
                var vendor = vendors.find(
                  (v) => v.vendor_ID === item.vendor_ID
                );
                if (vendor) {
                  vendor.contracts.push(item);
                } else {
                  vendors.push({
                    vendor_ID: item.vendor_ID,
                    vendorName: item.vendor.Name,
                    contracts: [item],
                  });
                }
              });

              oModel.setProperty("/vendorContracts", vendors);

              if (contractId) {
                self._setSelectedListItem(contractId);
              }

              setTimeout(function () {
                self._getViewModel().setProperty("/loading", false);
              }, 800);
            }.bind(this)
          )
          .catch(
            function (oError) {
              this._getViewModel().setProperty("/loading", false);
            }.bind(this)
          );
      },
      onContractItemClicked: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");
        var sPath = oItem.getBindingContextPath();
        var sId = this.getModel("vendorContracts").getProperty(sPath).ID;
        this._setSelectedListItem(sId);
        var bReplace = !Device.system.phone;
        this.getRouter().navTo(
          "Charges",
          { id: this.routeParams.id, vid: sId },
          false
        );
      },
      onNewContractButtonPressed: function () {
        var self = this;

        var payload = {
          validFrom: new Date().toISOString().split("T")[0],
          validTo: "9999-12-31",
          airport_ID: self.routeParams.id,
          status_code: "A",
          documentDate: new Date().toISOString().split("T")[0],
          documentType: "airport",
          objectType: "contract",
        };

        payload.validFrom = payload.validFrom.toString() + "T00:00:00.000Z";
        payload.validTo = payload.validTo.toString() + "T00:00:00.000Z";

        var oBinding = this.getModel().bindList("/PurDocs");

        oBinding.attachCreateCompleted(function (oEvent) {
          //   self.getModel().refresh();
          self.showBusyIndicator(false);
          var context = oEvent.getParameter("context");
          var data = context.getObject();

          self.dataLoaded = false;
          self.getRouter().navTo(
            "Charges",
            {
              id: self.routeParams.id,
              vid: data.ID,
            },
            false
          );
        }, this);

        this.showBusyIndicator(true);
        oBinding.create(payload, false);
      },
    });
  }
);
