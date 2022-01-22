sap.ui.define(
  [
    "./BaseController",
    "sap/ui/core/routing/History",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "sap/ui/Device",
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
    Device
  ) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Vendors", {
      formatter: formatters,
      onInit: function () {
        var viewModel = new JSONModel({
          airportId: "",
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
      },

      _onObjectMatched: function (oEvent) {
        var routeName = oEvent.getParameter("name");
        var oRouteParams = oEvent.getParameter("arguments");
        var airportId = oEvent.getParameter("arguments").id;

        this.getModel("appView").setProperty("/currentAirportId", airportId);

        if (routeName === "Vendors") {
          this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
          this.getModel("appView").setProperty("/mainTabsVisible", true);

          this.getModel("vendorsView").setProperty(
            "/airportId",
            oRouteParams.id
          );

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
        var oModel = this.getModel("vendorContracts");
        var self = this;
        const sUrl = this.getModel().sServiceUrl + "PurDocs";
        $.get({
          url: sUrl,
          data: {
            $filter: `airport_ID eq '${airportId}'`,
          },
          success: function (data) {
            self.dataLoaded = true;
            var vendors = [];
            data.value.forEach(function (item) {
              item.selected = item.ID === contractId;
              // check if vendor id already exists
              var vendor = vendors.find((v) => v.vendor_ID === item.vendor_ID);
              if (vendor) {
                vendor.contracts.push(item);
              } else {
                vendors.push({
                  vendor_ID: item.vendor_ID,
                  contracts: [item],
                });
              }
            });

            oModel.setProperty("/vendorContracts", vendors);
          },
        });
      },
      onContractItemClicked: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");
        var sPath = oItem.getBindingContextPath();
        var sId = this.getModel("vendorContracts").getProperty(sPath).ID;
        this._setSelectedListItem(sId);
        var sAirportId = this.getModel("vendorsView").getProperty("/airportId");
        var bReplace = !Device.system.phone;
        this.getRouter().navTo("Charges", { id: sAirportId, vid: sId }, false);
      },
    });
  }
);
