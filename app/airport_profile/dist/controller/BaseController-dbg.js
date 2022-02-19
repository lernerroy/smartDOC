sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  function (Controller, History) {
    "use strict";

    return Controller.extend("airportprofile.controller.BaseController", {
      /**
       * Convenience method for accessing the router in every controller of the application.
       * @public
       * @returns {sap.ui.core.routing.Router} the router for this component
       */
      getRouter: function () {
        return this.getOwnerComponent().getRouter();
      },

      getEventBus: function () {
        return this.getOwnerComponent().getEventBus();
      },

      showBusyIndicator: function (busy) {
        this.getModel("appView").setProperty("/busy", busy);
      },

      /**
       * Function to perform cross app navigation
       * will work only when app will run inside FLP
       * @param {*} semanticObject
       * @param {*} action
       * @param {*} params
       */
      crossNavigate: function (semanticObject, action, params = {}) {
        if (!semanticObject || !action) {
          return;
        }

        var xnaservice =
          sap.ushell &&
          sap.ushell.Container &&
          sap.ushell.Container.getService &&
          sap.ushell.Container.getService("CrossApplicationNavigation");

        if (!xnaservice) {
          return;
        }

        var href =
          (xnaservice &&
            xnaservice.hrefForExternal({
              target: {
                semanticObject: semanticObject,
                action: action,
              },
              params: params,
            })) ||
          "";

        xnaservice.toExternal({
          target: {
            shellHash: href,
          },
        });
      },

      /**
       * Convenience method for getting the view model by name in every controller of the application.
       * @public
       * @param {string} sName the model name
       * @returns {sap.ui.model.Model} the model instance
       */
      getModel: function (sName) {
        return this.getView().getModel(sName);
      },

      /**
       * Convenience method for setting the view model in every controller of the application.
       * @public
       * @param {sap.ui.model.Model} oModel the model instance
       * @param {string} sName the model name
       * @returns {sap.ui.mvc.View} the view instance
       */
      setModel: function (oModel, sName) {
        return this.getOwnerComponent().setModel(oModel, sName);
      },

      /**
       * Convenience method for getting the resource bundle.
       * @public
       * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
       */
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
      },

      /**
       * Event handler for navigating back.
       * It there is a history entry we go one step back in the browser history
       * If not, it will replace the current entry of the browser history with the master route.
       * @public
       */
      onNavBack: function (fallbackRouteName) {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          history.go(-1);
        } else {
          this.getRouter().navTo(fallbackRouteName, {}, true);
        }
      },

      getAppViewModel: function() {
          return this.getModel("appView");
      }
    });
  }
);
