sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel", "sap/f/LayoutType"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, JSONModel, LayoutType) {
    "use strict";

    return BaseController.extend("airportprofile.controller.App", {
      onInit: function () {
        var oViewModel,
          fnSetAppNotBusy,
          iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

        oViewModel = new JSONModel({
          busy: false,
          mainTabsVisible: false,
          currentSelectedTabKey: "vendor",
          prevSelectedTabKey: "vendor",
          currentAirportId: null,
          delay: 0,
          layout: LayoutType.MidColumnFullScreen,
          previousLayout: "",
          actionButtonsInfo: {
            midColumn: {
              fullScreen: false,
            },
          },
        });
        this.setModel(oViewModel, "appView");
        fnSetAppNotBusy = function () {
          oViewModel.setProperty("/busy", false);
          oViewModel.setProperty("/delay", iOriginalBusyDelay);
        };
      },
      onMainTabSelected() {
        var appModel = this.getModel("appView");

        var type = appModel.getProperty("/currentSelectedTabKey");
        var airportId = appModel.getProperty("/currentAirportId");

        if (type === "vendor") {
          this.getRouter().navTo("Vendors", { id: airportId }, false);
        } else {
          this.getRouter().navTo(
            "TaskDetails",
            { id: airportId, type: type },
            false
          );
        }
      },
    });
  }
);
