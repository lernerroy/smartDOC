sap.ui.define(
  ["./BaseController", "sap/ui/core/routing/History"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, History) {
    "use strict";

    return BaseController.extend("airportprofile.controller.AirportDetails", {
      onInit: function () {
        this.getRouter()
          .getRoute("AirportDetails")
          .attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
      },
      onNavBack: function () {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          history.go(-1);
        } else {
          this.getRouter().navTo("Airports", {}, true);
        }
      },
    });
  }
);
