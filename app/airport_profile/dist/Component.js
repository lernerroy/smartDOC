sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","airportprofile/model/models","airportprofile/libs/moment"],function(e,i,t,o){"use strict";return e.extend("airportprofile.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});