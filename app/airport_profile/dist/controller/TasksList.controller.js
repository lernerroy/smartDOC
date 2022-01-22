sap.ui.define(["./BaseController","sap/f/LayoutType","sap/ui/Device","sap/ui/model/json/JSONModel"],function(e,t,a,r){"use strict";return e.extend("airportprofile.controller.TasksList",{onInit:function(){var e=new r({items:[]});this.setModel(e,"tasksListDataModel");this.getRouter().getRoute("TasksList").attachPatternMatched(this._onObjectMatched,this);this.getRouter().getRoute("TaskDetails").attachPatternMatched(this._onObjectMatched,this)},_getDataModel:function(){return this.getModel("tasksListDataModel")},_onObjectMatched:function(e){var a=e.getParameter("name");var r=e.getParameter("arguments");this.getModel("appView").setProperty("/mainTabsVisible",true);this.getModel("appView").setProperty("/currentSelectedTabKey",r.type);if(a==="TasksList"){this.getModel("appView").setProperty("/layout",t.OneColumn);this.getModel("appView").setProperty("/currentAirportId",r.id);this.getModel("appView").setProperty("/mainTabsVisible",true);this.getModel("appView").setProperty("/currentSelectedTabKey",r.type);this.loadData(r.type,r.id)}else if(a==="TaskDetails"){this.getModel("appView").setProperty("/currentAirportId",r.id);if(!this.dataLoaded){this.loadData(r.type,r.id,r.vid)}else{this._setSelectedListItem(r.vid)}}},loadData:function(e,t,a){var r=this.getModel().sServiceUrl+"TaskLists";var i=this._getDataModel();this.showBusyIndicator(true);var s=this;var o="";if(e==="dep"){o=`origin_ID eq '${t}'`}else if(e==="arr"){o=`destination_ID eq '${t}'`}$.get({url:r,data:{$filter:o,$orderby:"validTo desc","sap-valid-from":"date'1900-01-01'"},success:function(e){s.dataLoaded=true;s.showBusyIndicator(false);var t=_.cloneDeep(e.value);t.forEach(function(e){e.version=`${moment(e.validFrom).format("MMM Do YY")} - ${moment(e.validTo).format("MMM Do YY")}`;e.selected=e.ID===a;e.isCurrent=moment().isBetween(e.validFrom,e.validTo)});i.setProperty("/items",t)},error:function(e){s.showBusyIndicator(false)}})},_setSelectedListItem:function(e){var t=this._getDataModel();var a=t.getProperty("/items");a.forEach(t=>{t.selected=t.ID===e});t.refresh()},onTaskListPressed:function(e){var t=e.getParameter("listItem");var a=t.getBindingContextPath();var r=this._getDataModel().getProperty(a).ID;this._setSelectedListItem(r);var i=this.getModel("appView").getProperty("/currentAirportId");var s=this.getModel("appView").getProperty("/currentSelectedTabKey");this.getRouter().navTo("TaskDetails",{id:i,vid:r,type:s},false)},onAddAirport:function(){var e=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService&&sap.ushell.Container.getService("CrossApplicationNavigation");var t=e&&e.hrefForExternal({target:{semanticObject:"airports_configuration",action:"manage_airports"},params:{}})||"";e.toExternal({target:{shellHash:t}})}})});