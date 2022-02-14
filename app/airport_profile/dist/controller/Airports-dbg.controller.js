sap.ui.define(
  ["./BaseController", "sap/f/LayoutType", "sap/ui/Device"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, LayoutType, Device) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Airports", {
      onInit: function () {
        this.getRouter()
          .getRoute("Airports")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (oEvent) {
        this.getModel("appView").setProperty("/mainTabsVisible", false);
        this.getModel("appView").setProperty(
          "/layout",
          LayoutType.MidColumnFullScreen
        );

        var oList = this.getView().byId("airportList");

        oList.attachUpdateStarted(function () {
          sap.ui.core.BusyIndicator.show();
        });

        oList.attachUpdateFinished(function () {
          sap.ui.core.BusyIndicator.hide();
          oList.setVisible(true);
        });

      },
      onAirportClicked: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");

        this.getRouter().navTo(
          "Vendors",
          { id: oItem.getBindingContext().getProperty("airport_ID") },
          false
        );
      },
      airportNamePressed: function (oEvent) {
        var oBinding = oEvent.getSource().getBindingContext();

        var airportId = oBinding.getProperty("airport_ID");
        var isActiveEntity = oBinding.getProperty("IsActiveEntity");

        this.crossNavigate("airports_configuration", "manage_airports", {
          code: airportId,
          IsActiveEntity: isActiveEntity,
        });
      },
      onPlantPressed: function (oEvent) {
        var oBinding = oEvent.getSource().getBindingContext();

        var airportId = oBinding.getProperty("airport_ID");
        var isActiveEntity = oBinding.getProperty("IsActiveEntity");

        this.crossNavigate("airports_eh", "Manage", {
          code: airportId,
          IsActiveEntity: isActiveEntity,
        });

      },
      onAddAirport: function () {
        this.crossNavigate("airports_configuration", "manage_airports");
      },
    });
  }
);
