sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History"],function(e,t){"use strict";return e.extend("airportprofile.controller.BaseController",{getRouter:function(){return this.getOwnerComponent().getRouter()},getEventBus:function(){return this.getOwnerComponent().getEventBus()},showBusyIndicator:function(e){this.getModel("appView").setProperty("/busy",e)},crossNavigate:function(e,t,n={}){if(!e||!t){return}var r=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService&&sap.ushell.Container.getService("CrossApplicationNavigation");if(!r){return}var o=r&&r.hrefForExternal({target:{semanticObject:e,action:t},params:n})||"";r.toExternal({target:{shellHash:o}})},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getOwnerComponent().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onNavBack:function(e){var n=t.getInstance().getPreviousHash();if(n!==undefined){history.go(-1)}else{this.getRouter().navTo(e,{},true)}},getAppViewModel:function(){return this.getModel("appView")}})});