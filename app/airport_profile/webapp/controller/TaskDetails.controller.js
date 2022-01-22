sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, LayoutType, JSONModel, formatters) {
    "use strict";

    return BaseController.extend("airportprofile.controller.TaskDetails", {
      formatter: formatters,

      onInit: function () {
        var viewModel = new JSONModel({
          title: "",
          selectedTabKey: "airportCharges",
        });

        this.setModel(viewModel, "taskDetailsViewModel");

        var dataModel = new JSONModel({
          airportCharges: [],
          cargoCharges: [],
          items: [],
        });

        this.setModel(dataModel, "taskDetailsDataModel");

        this.getRouter()
          .getRoute("TaskDetails")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (oEvent) {
        this.getModel("appView").setProperty("/mainTabsVisible", true);
        var oRouteParams = oEvent.getParameter("arguments");
        this.getModel("appView").setProperty(
          "/layout",
          LayoutType.TwoColumnsMidExpanded
        );

        this.loadData(oRouteParams.vid);
      },
      _getDataModel: function () {
        return this.getModel("taskDetailsDataModel");
      },
      /**
       * Load the line of business items
       * @param {*} id
       */
      loadData: function (id) {
        var self = this;
        self.showBusyIndicator(true);
        var oModel = this._getDataModel();
        oModel.setProperty("/items", []);
        const sUrl = `${this.getModel().sServiceUrl}TaskLists`;
        $.get({
          url: `${sUrl}(ID=${id},IsActiveEntity=true)/items`,
          data: {},
          success: function (data) {
            self.showBusyIndicator(false);
            self._mapDataToModel(data.value);
            self._displayItemsBySelectedTabKey();
          },
          error: function (err) {
            self.showBusyIndicator(false);
          },
        });
      },
      _mapDataToModel(items) {
        var oModel = this._getDataModel();

        // loop on items and map results based on  lineOfBusiness value
        var airportCharges = items.filter(function (item) {
          return item.lineOfBusiness === "airport";
        });

        var cargoCharges = items.filter(function (item) {
          return item.lineOfBusiness === "cargo";
        });

        oModel.setProperty("/airportCharges", airportCharges);
        oModel.setProperty("/cargoCharges", cargoCharges);
      },
      _displayItemsBySelectedTabKey: function () {
        var oModel = this._getDataModel();
        var selectedKey = this.getModel("taskDetailsViewModel").getProperty(
          "/selectedTabKey"
        );

        switch (selectedKey) {
          case "airportCharges":
            oModel.setProperty("/items", oModel.getProperty("/airportCharges"));
            break;
          case "cargoCharges":
            oModel.setProperty("/items", oModel.getProperty("/cargoCharges"));
            break;
        }
      },
      onLobTabSelected: function () {
        this._displayItemsBySelectedTabKey();
      },
      onBrfButtonPressed: function (oEvent) {
        var oListItem = oEvent.getSource().getParent();
        var sPath = oListItem.getBindingContextPath();

        // get the item from the model
        var oItem = this.getModel("detailsModel").getProperty(sPath);
      },
      onServicesButtonPressed: function(oEvent){
        var sPath = oEvent.getSource().getParent().getBindingContextPath();
        var oItem = this._getDataModel().getProperty(sPath);
      }
    });
  }
);
