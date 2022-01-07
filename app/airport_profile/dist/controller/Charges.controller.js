sap.ui.define(["./BaseController","sap/f/LayoutType","sap/ui/model/json/JSONModel","../utils/formatters","airportprofile/libs/lodash"],function(e,t,r,a,s){"use strict";return e.extend("airportprofile.controller.Charges",{formatter:a,onInit:function(){var e=new r({title:""});this.setModel(e,"detailsViewModel");var t=new r({header:{}});this.setModel(t,"detailsModel");this.getRouter().getRoute("Charges").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:function(e){this.getModel("appView").setProperty("/mainTabsVisible",true);this.getEventBus().publish("route","charges",e.getParameter("arguments"));this.getModel("appView").setProperty("/layout",t.TwoColumnsMidExpanded);this.loadData(e.getParameter("arguments").vid)},loadData:function(e){var t=this;t.showBusyIndicator(true);var r=this.getModel("detailsModel");const a=this.getModel().sServiceUrl+"PurDocs";$.get({url:`${a}(ID=${e},IsActiveEntity=true)`,data:{$select:"extenalID,documentDate,description,status,validFrom,validTo,aribaIndicator",$expand:"vendor,carrier,purchaseOrganization,items"},success:function(e){var a=_.cloneDeep(e);a.airportCharges=[];a.cargos=[];a.engs=[];a.caterings=[];if(e&&e.items){e.items.forEach(function(e){if(e.lineOfBusiness==="airport"){a.airportCharges.push(e)}else if(e.lineOfBusiness==="cargo"){a.cargos.push(e)}})}a.items=a.airportCharges;r.setProperty("/header",a);t.showBusyIndicator(false);var s=t.getResourceBundle().getText("contract");t.getModel("detailsViewModel").setProperty("/title",`${s} ${e.extenalID} (${e.description})`)},error:function(e){t.showBusyIndicator(false)}})},onLobTabSelected:function(e){var t=this.getModel("detailsModel");var r=t.getProperty("/header");var a=e.getParameter("selectedKey");t.setProperty("/header/items",r[a])},onBrfButtonPressed:function(e){var t=e.getSource().getParent();var r=t.getBindingContextPath();var a=this.getModel("detailsModel").getProperty(r)}})});