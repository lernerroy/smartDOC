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

        var vendorsModel = new JSONModel({
          vendorContracts: [],
        });

        this.setModel(vendorsModel, "vendorContracts");

        this.getEventBus().subscribe(
          "route",
          "charges",
          this._onItemChanged,
          this
        );
      },

      _onItemChanged: function (channel, eventId, data) {        
        if (!this.dataLoaded) {
          if (!this.getModel("vendorsView").getProperty("/airportId")) {
            this.getModel("vendorsView").setProperty("/airportId", data.id);
          }
          this.loadData(data.id, data.vid);
        } else {
            this._setSelectedListItem(data.vid);
        }
      },

      navToAirports: function () {
        this.getRouter().navTo("Airports", {}, true);
      },

      _onObjectMatched: function (oEvent) {
        this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);        
        this.getModel("appView").setProperty("/mainTabsVisible", true);
        var airportId = oEvent.getParameter("arguments").id;
        this.getModel("vendorsView").setProperty("/airportId", airportId);
        this.loadData(airportId);
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
        const sUrl = this.getModel().sServiceUrl + "PurHeader";
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
