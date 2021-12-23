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

        this.getModel("appView").setProperty("/layout", LayoutType.MidColumnFullScreen);

        var oList = this.getView().byId("airportList");

        oList.attachUpdateStarted(function(){
            sap.ui.core.BusyIndicator.show();
        });

        oList.attachUpdateFinished(function() {
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
      onAddAirport: function () {
        var xnaservice =
          sap.ushell &&
          sap.ushell.Container &&
          sap.ushell.Container.getService &&
          sap.ushell.Container.getService("CrossApplicationNavigation");
        var href =
          (xnaservice &&
            xnaservice.hrefForExternal({
              target: {
                semanticObject: "airports_configuration",
                action: "manage_airports",
              },
              params: {},
            })) ||
          "";

        xnaservice.toExternal({
          target: {
            shellHash: href,
          },
        });
      },
    });
  }
);
