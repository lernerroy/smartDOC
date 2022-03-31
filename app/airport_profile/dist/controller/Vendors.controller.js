sap.ui.define(["./BaseController","sap/ui/core/routing/History","sap/f/LayoutType","sap/ui/model/json/JSONModel","../utils/formatters","sap/ui/Device","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(t,e,a,r,s,i,o,n){"use strict";return t.extend("airportprofile.controller.Vendors",{formatter:s,onInit:function(){var t=new r({airportId:"",loading:false});this.setModel(t,"vendorsView");this.getRouter().getRoute("Vendors").attachPatternMatched(this._onObjectMatched,this);this.getRouter().getRoute("Charges").attachPatternMatched(this._onObjectMatched,this);var e=new r({vendorContracts:[]});this.setModel(e,"vendorContracts");this.getEventBus().subscribe(null,"refreshVendors",this.onRefresh,this);this.getEventBus().subscribe(null,"selectVendorItem",function(t,e,a){this._setSelectedListItem(a.id)},this)},onRefresh:function(){this.loadData(this.routeParams.id,this.routeParams.vid)},_getViewModel:function(){return this.getModel("vendorsView")},_onObjectMatched:function(t){var e=t.getParameter("name");var r=t.getParameter("arguments");var s=t.getParameter("arguments").id;this.routeParams=r;this.getModel("appView").setProperty("/currentAirportId",s);this.getModel("vendorsView").setProperty("/airportId",r.id);if(e==="Vendors"){this.getModel("appView").setProperty("/layout",a.OneColumn);this.getModel("appView").setProperty("/mainTabsVisible",true);this.loadData(r.id)}else if(e==="Charges"){if(!this.dataLoaded){this.loadData(r.id,r.vid)}else{this._setSelectedListItem(r.vid)}}},navToAirports:function(){this.getRouter().navTo("Airports",{},true)},onNavBack:function(){var t=e.getInstance().getPreviousHash();if(t!==undefined){history.go(-1)}else{this.navToAirports()}},_setSelectedListItem:function(t){var e=this.getModel("vendorContracts");var a=e.getProperty("/vendorContracts");a.forEach(e=>{e.contracts.forEach(e=>{e.selected=e.ID===t})});e.refresh()},loadData:function(t,e){var a="";if(sap.ushell){a=sap.ushell.Container.getUser().getEmail()}var r=this.getModel("vendorContracts");var s=this;const i=this.getModel().sServiceUrl+"PurDocs?sap-valid-from=date'0001-01-01'";this._getViewModel().setProperty("/loading",true);var d=this.getModel().bindList("/PurDocs",null,null,null,{$expand:"status,DraftAdministrativeData"});d.filter([new o({path:"airport_ID",operator:n.EQ,value1:t}),new o({filters:[new o({path:"IsActiveEntity",operator:n.EQ,value1:false}),new o({path:"SiblingEntity/IsActiveEntity",operator:n.EQ,value1:null})],and:false})]);d.requestContexts(0,500).then(function(t){s.dataLoaded=true;var i=t.map(t=>t.getObject());var o=[];i.forEach(function(t){t.selected=t.ID===e;t.inProcessByMe=t.DraftAdministrativeData&&t.DraftAdministrativeData.InProcessByUser===a;t.showDraftIndicator=!t.IsActiveEntity&&!t.HasDraftEntity||t.IsActiveEntity&&t.HasDraftEntity&&t.DraftAdministrativeData.LastChangedByUser===a;t.showUnsavedChangesIndicator=t.IsActiveEntity&&t.HasDraftEntity&&t.DraftAdministrativeData.LastChangedByUser!==a;if(t.showUnsavedChangesIndicator){t.draftLastChangedByText=`${this.getResourceBundle().getText("unsavedChangesBy")} ${t.DraftAdministrativeData.LastChangedByUser}`}t.showLockedIndicator=t.IsActiveEntity&&t.HasDraftEntity&&t.DraftAdministrativeData.LastChangedByUser!==a&&t.DraftAdministrativeData.InProcessByUser;if(t.showLockedIndicator){t.lockedText=`${this.getResourceBundle().getText("lockedBy")} ${t.DraftAdministrativeData.LastChangedByUser}`}var r=o.find(e=>e.vendor_ID===t.vendor_ID);if(r){r.contracts.push(t)}else{o.push({vendor_ID:t.vendor_ID,contracts:[t]})}});r.setProperty("/vendorContracts",o);if(e){s._setSelectedListItem(e)}setTimeout(function(){s._getViewModel().setProperty("/loading",false)},800)}.bind(this)).catch(function(t){this._getViewModel().setProperty("/loading",false)}.bind(this))},onContractItemClicked:function(t){var e=t.getParameter("listItem");var a=e.getBindingContextPath();var r=this.getModel("vendorContracts").getProperty(a).ID;this._setSelectedListItem(r);var s=!i.system.phone;this.getRouter().navTo("Charges",{id:this.routeParams.id,vid:r},false)},onNewContractButtonPressed:function(){var t=this;var e={validFrom:(new Date).toISOString().split("T")[0],validTo:"9999-12-31",airport_ID:t.routeParams.id,status_code:"A",documentDate:(new Date).toISOString().split("T")[0],documentType:"airport",objectType:"contract"};e.validFrom=e.validFrom.toString()+"T00:00:00.000Z";e.validTo=e.validTo.toString()+"T00:00:00.000Z";var a=this.getModel().bindList("/PurDocs");a.attachCreateCompleted(function(e){t.showBusyIndicator(false);var a=e.getParameter("context");var r=a.getObject();t.dataLoaded=false;t.getRouter().navTo("Charges",{id:t.routeParams.id,vid:r.ID},false)},this);this.showBusyIndicator(true);a.create(e,false)}})});