sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/ButtonType",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/core/message/ControlMessageProcessor",
    "sap/ui/core/Core",
    "sap/ui/core/message/Message",
  ],
  function (
    Controller,
    History,
    Dialog,
    DialogType,
    ButtonType,
    Button,
    Text,
    ControlMessageProcessor,
    oCore,
    Message
  ) {
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

        if (!sap.ushell || !sap.ushell.Container) {
          return;
        }

        sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(
          function (xnaservice) {
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
          }
        );
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
      onNavBack: function (
        fallbackRouteName,
        params = {},
        forceFallbackRoute = false
      ) {
        var sPreviousHash = History.getInstance().getPreviousHash();
        if (sPreviousHash !== undefined && !forceFallbackRoute) {
          history.go(-1);
        } else {
          this.getRouter().navTo(fallbackRouteName, params, true);
        }

        if (this.oMessageManager){
            this.oMessageManager.removeAllMessages();
            this.oMessageManager.unregisterMessageProcessor(this.oMessageProcessor);
        }
        

      },

      getAppViewModel: function () {
        return this.getModel("appView");
      },

      showMessageDialog: function (title, message) {
        this.oMessageDialog = new Dialog({
          type: DialogType.Message,
          title: title,
          content: [new Text({ text: message })],
          beginButton: new Button({
            type: ButtonType.Emphasized,
            text: "Close",
            press: function () {
              this.oMessageDialog.close();
              this.oMessageDialog.destroy();
              this.oMessageDialog = null;
            }.bind(this),
          }),
        });

        this.oMessageDialog.open();
      },

      initializeMessageManager: function () {
        var oMessageProcessor = new ControlMessageProcessor();
        var oMessageManager = oCore.getMessageManager();
        oMessageManager.registerMessageProcessor(oMessageProcessor);
        this.oMessageProcessor = oMessageProcessor;
        this.oMessageManager = oMessageManager;
      },

      /**
       * 
       * @param {*} message type of sap/ui/core/message/Message
       */
      addMessage: function(text, msgType){
        if (!this.oMessageManager || !this.oMessageProcessor){
            return;
        }

        this.oMessageManager.addMessages(
            new Message({
                message: text,
                type: msgType,
                processor: this.oMessageProcessor
            })
        );
      }
    });
  }
);
