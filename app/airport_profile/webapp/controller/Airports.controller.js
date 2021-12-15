sap.ui.define(
  ["./BaseController"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Airports", {
      onInit: function () {},
      onAirportClicked: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");

        this.getRouter().navTo("AirportDetails", { id: "1233" }, true);
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
