sap.ui.define(["./BaseController","sap/f/LayoutType","sap/ui/model/json/JSONModel","../utils/formatters","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/Fragment","sap/m/StandardListItem","sap/m/MessageBox","../utils/draftUtils","sap/m/MessagePopover","sap/m/MessagePopoverItem","sap/ui/core/MessageType"],function(e,t,a,s,r,i,n,o,l,d,c,u,h){"use strict";return e.extend("airportprofile.controller.Charges",{formatter:s,onInit:function(){this._initViewModel();this.initializeMessageManager();var e=new a({header:{},headerCopy:null});this.setModel(e,"detailsModel");var t=this;this.getRouter().getRoute("Charges").attachPatternMatched(this._onObjectMatched,this);this._hashHandler=function(){var e;var a=function(s){var r=s.oldURL.substr(s.oldURL.search("#")+1);var i=s.newURL.substr(s.newURL.search("#")+1);if(e!==r){return}if(t._getViewModel().getProperty("/editable")){window.hasher.setHash(r.substr(1));if(t.formChanged){t.onCancelCreate(i)}}else{window.removeEventListener("hashchange",a);window.hasher.setHash(r.substr(1));window.hasher.changed.active=true;window.hasher.setHash(i.substr(1))}};return{startManualHashChangeHandling:function(){e=window.location.hash.substr(1);window.hasher.changed.active=false;window.addEventListener("hashchange",a)},stopManualHashChangeHandling:function(){window.hasher.changed.active=true;window.removeEventListener("hashchange",a)}}}()},onDeleteLobItem:function(e){var t=e.getSource().getParent().getParent().getBindingContext();t.delete()},_deleteLobItem:function(e,t,a){var s=this.getModel().sServiceUrl;s=`${s}PurItems(up__ID=${e.up__ID},IsActiveEntity=${e.IsActiveEntity},ID=${e.ID})`;$.ajax({url:s,type:"DELETE",headers:{"Content-Type":"application/json;IEEE754Compatible=true"},success:t,error:a})},_initViewModel:function(){var e={vhTitle:"",title:"",editLobDialog:{title:"",busy:false},modes:{create:false,edit:false,displayWithDraft:false,displayWithoutDraft:false,locked:false},lobSelectedTab:"airport",editable:false};var t=this._getViewModel();if(t){t.setData(e)}else{this.setModel(new a(e),"detailsViewModel")}},_getDataModel:function(){return this.getModel("detailsModel")},_getViewModel:function(){return this.getModel("detailsViewModel")},_getLobSelectedTab:function(){return this._getViewModel().getProperty("/lobSelectedTab")},_onObjectMatched:function(e){this._getDataModel().setProperty("/header",{});this.getModel("appView").setProperty("/mainTabsVisible",true);this.routeParams=e.getParameter("arguments");this.getModel("appView").setProperty("/currentAirportId",this.routeParams.id);this.getEventBus().publish("route","charges",e.getParameter("arguments"));this.getModel("appView").setProperty("/layout",t.TwoColumnsMidExpanded);this.loadData(e.getParameter("arguments").vid)},loadData:function(e){var t=this;var a=[new r({path:"ID",operator:i.EQ,value1:e}),new r({filters:[new r({path:"IsActiveEntity",operator:i.EQ,value1:false}),new r({path:"SiblingEntity/IsActiveEntity",operator:i.EQ,value1:null})],and:false})];var s=this.getModel().bindList("/PurDocs",null,null,a,null);s.requestContexts(0,2).then(function(e){if(e&&e.length>0){this.oContext=e[0];this.oContextObjectCopy=_.cloneDeep(this.oContext.getObject());t.loadContract(e[0])}else{t._navToVendors()}}.bind(this)).catch(function(e){}.bind(this))},loadContract:function(e){var t=this;this.getView().bindElement({path:e.getPath(),parameters:{$select:"extenalID,documentDate,description,status,validFrom,validTo,aribaIndicator",$expand:"vendor,carrier,purchaseOrganization,status,DraftAdministrativeData"},events:{dataReceived:function(e){var a=e.getSource().getBoundContext().getObject();t._updateFormMode(a)},change:function(){}}})},_updateFormMode:function(e){var t="";if(sap.ushell){t=sap.ushell.Container.getUser().getEmail()}var a=e.DraftAdministrativeData&&e.DraftAdministrativeData.DraftIsCreatedByMe&&!e.IsActiveEntity&&!e.HasActiveEntity&&!e.HasDraftEntity?true:false;var s=e.DraftAdministrativeData&&e.DraftAdministrativeData.DraftIsCreatedByMe&&!e.IsActiveEntity&&e.HasActiveEntity&&!e.HasDraftEntity?true:false;var r=e.DraftAdministrativeData&&!e.DraftAdministrativeData.DraftIsCreatedByMe&&e.IsActiveEntity&&!e.HasActiveEntity&&e.HasDraftEntity?true:false;var i=!e.DraftAdministrativeData&&e.IsActiveEntity&&!e.HasDraftEntity&&e.HasDraftEntity?true:false;var n=e.IsActiveEntity&&e.HasDraftEntity&&e.DraftAdministrativeData.LastChangedByUser!==t&&e.DraftAdministrativeData.InProcessByUser?true:false;this._getViewModel().setProperty("/modes",{create:a,edit:s,displayWithDraft:r,displayWithoutDraft:i,locked:n});this._getViewModel().setProperty("/editable",a||s);if(a||s){this.formChanged=true;this._hashHandler.startManualHashChangeHandling()}else{this._hashHandler.stopManualHashChangeHandling()}},onValueHelpRequest:function(e){var t=e.getSource().getValue(),a=this.getView();var s="";this.currentValueHelpInputID=e.getSource().data("name");switch(e.getSource().data("name")){case"purchaseOrgInput":s="/PurchaseOrganizations";this._getViewModel().setProperty("/vhTitle","Purchase Organizations");break;case"vendorInput":s="/BusinessPartners";this._getViewModel().setProperty("/vhTitle","Vendors");break;case"serviceInput":s="/ServiceData";this._getViewModel().setProperty("/vhTitle","Services");break;default:break}if(!this._pValueHelpDialog){this._pValueHelpDialog=n.load({id:a.getId(),name:"airportprofile.fragments.ValueHelpDialog",controller:this}).then(function(e){a.addDependent(e);return e})}this._pValueHelpDialog.then(function(e){e.bindAggregation("items",{path:s,filters:[new r("ID",i.EQ,t)],template:new o({title:"{Name}",description:"{ID}"})});e.open(t)})},onValueHelpDialogSearch:function(e){var t=e.getParameter("value");var a=new r("ID",i.EQ,t);e.getSource().getBinding("items").filter([a])},onValueHelpDialogClose:function(e){var t,a=e.getParameter("selectedItem");e.getSource().getBinding("items").filter([]);if(!a){return}t=a.getDescription();this.byId(this.currentValueHelpInputID).setSelectedKey(t);this.byId(this.currentValueHelpInputID+"ID").setText(t)},onPurchaseOrgSuggestionItemSelected:function(e){var t=e.getParameter("selectedItem");var a=t.getKey();this.getModel("editedContract").setProperty("/purchaseOrgId",a)},onVendorSuggestionItemSelected:function(e){var t=e.getParameter("selectedItem");var a=t.getKey();this.getModel("editedContract").setProperty("/vendorId",a)},onServiceSuggestionItemSelected:function(e){var t=e.getParameter("selectedItem");var a=t.getKey();this.getModel("editLobData").setProperty("/serviceNumberId",a)},_navToVendors:function(){this._hashHandler.stopManualHashChangeHandling();this.onNavBack("Vendors",{id:this.routeParams.id},true)},vendorOnSuggest:function(e){var t=e.getParameter("suggestValue"),a=[];if(t){a=[new r([new r("ID",i.EQ,t),new r("Name",i.EQ,t)],false)]}e.getSource().getBinding("suggestionItems").filter(a);e.getSource().suggest()},onCancelButtonClicked:function(){this.onCancelCreate()},onCancelCreate:function(e=null){var t=this;d.handleDraftSaveChanges(this.getResourceBundle(),{onKeepDraft:function(){t._getViewModel().setProperty("/editable",false);if(e!==null){window.hasher.setHash(e.substr(1));this._hashHandler.stopManualHashChangeHandling()}else{t._navToVendors()}},onDiscardDraft:function(){t._deleteContext()},onCancel:function(){t.getEventBus().publish(null,"selectVendorItem",{id:t.oContext.getObject().ID})}})},onMessagesIndicatorPressed:function(e){var t=e.getSource();if(!this._messagePopover){this._messagePopover=new c({items:{path:"message>/",template:new u({description:"{message>description}",type:"{message>type}",title:"{message>message}"})}});t.addDependent(this._messagePopover)}this._messagePopover.toggle(t)},onSaveContract:function(){var e=this.getModel().bindContext("smartDOCDraft.draftActivate(...)",this.oContext);var t=this;this.oMessageManager.removeAllMessages();e.execute().then(function(e){t.loadData(e.getObject().ID);t.getEventBus().publish(null,"refreshVendors")}.bind(this)).catch(function(e){})},_discardDraft:function(){const e=this.getModel().sServiceUrl+"PurDocs";var t=this._getDataModel();var a=t.getProperty("/header/ID");var s=this;$.get({url:`${e}(ID=${a},IsActiveEntity=false)/SiblingEntity?sap-valid-from=date%270001-01-01%27`,success:function(t){$.ajax({url:`${e}(ID=${a},IsActiveEntity=false)?sap-valid-from=date%270001-01-01%27`,method:"DELETE"}).fail(function(e){if(e.status!==404){s.showMessageDialog(s.getResourceBundle().getText("error"),e.responseJSON.error.message)}s.showBusyIndicator(false)}).success(function(){s.showBusyIndicator(false);s._getViewModel().setProperty("/editable",false);s._navToVendors();s.getEventBus().publish(null,"refreshVendors")})},error:function(e){s._getViewModel().setProperty("/editable",false);s._navToVendors();s.showBusyIndicator(false)}})},onLobTabSelected:function(e){var t=e.getParameter("selectedKey");var a=this.getView().byId("lobsTable");var s=a.getBinding("items");s.filter(new r({path:"lineOfBusiness",operator:i.EQ,value1:t}))},onBrfButtonPressed:function(e){var t=e.getSource().getParent().getParent();var a=t.getBindingContextPath();var s=this.getModel("detailsModel").getProperty(a);if(!sap.ushell||!sap.ushell.Container){return}sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(e){const t={MD_APP_BASE_URL:"BusinessRules-ManageDecision&/RuleServices",REVISIONS:"Revisions"};var a=t.MD_APP_BASE_URL+"/"+s.brf_id;e.toExternal({target:{shellHash:a}})})},_setupEditedContractModel:function(e){var t=new a({contractItem:null,statusCode:e.status?e.status.code:"",description:e.description,docDate:e.documentDate,validFromDate:e.validFrom,validToDate:e.validTo,carrierId:e.carrier_ID,purchaseOrgId:e.purchaseOrganization_ID,purchaseOrgName:e.purchaseOrganization?"("+e.purchaseOrganization_ID+") "+e.purchaseOrganization.Name:"",vendorId:e.vendor_ID,vendorName:e.vendor?"("+e.vendor_ID+") "+e.vendor.Name:""});this.contractChanged=false;this.getView().setModel(t,"editedContract");t.attachPropertyChange(function(){this.contractChanged=true;var t=this.getView().getModel("editedContract").getData();this._saveDraftContract(e.ID,e.IsActiveEntity,t)},this);return t},_saveDraftContract:function(e,t,a){var s=`${this.getModel().sServiceUrl}PurDocs(ID=${e},IsActiveEntity=${t})`;var r="PATCH";var i=this.getView().getModel("editedContract");var n=this;var o={validFrom:a.validFromDate?moment(a.validFromDate,"YYYY-MM-DD HH:mm:ss.SS").utc(false).format("yyyy-MM-DDThh:mm:ss.sssZ"):"",validTo:a.validToDate?moment(a.validToDate,"YYYY-MM-DD HH:mm:ss.SS").utc(false).format("yyyy-MM-DDThh:mm:ss.sssZ"):"",objectType:"contract",documentDate:a.docDate,description:a.description,airport_ID:this.routeParams.id,status_code:a.statusCode,carrier_ID:a.carrierId,purchaseOrganization_ID:a.purchaseOrgId,documentType:"airport",vendor_ID:a.vendorId,aribaIndicator:null};$.ajax({url:s,type:r,data:JSON.stringify(o),headers:{"Content-Type":"application/json;IEEE754Compatible=true"},dataType:"json",success:function(e){i.setProperty("/contractItem",e)},error:function(e){n.showMessageDialog(n.getResourceBundle().getText("error"),e.responseJSON.error.message)}})},onEditContractPressed:function(){var e=this.getModel().bindContext("smartDOCDraft.draftEdit(...)",this.oContext);var t=this;e.execute().then(function(e){t.loadData(e.getObject().ID);t.getEventBus().publish(null,"refreshVendors")}.bind(this)).catch(function(e){t.showMessageDialog("Error",e.responseJSON.error.message)})},onDeleteContractPressed:function(){var e=this.oContext.getObject();var t=`Delete the object ${e.extenalID} (${e.description})`;var a=this;l.warning(t,{actions:["Delete",l.Action.CANCEL],emphasizedAction:"Delete",onClose:function(e){if(e==="Delete"){a._deleteContext()}}})},_deleteContext:function(){var e=this;this.oContext.delete().then(function(){e.getEventBus().publish(null,"refreshVendors");e._navToVendors()}).catch(function(t){e.showMessageDialog("Error",t.responseJSON.error.message)})},onAddLobItem:function(){this._getViewModel().setProperty("/editLobDialog/title","Create Item");var e=this.getModel().bindList("items",this.oContext,null,null,{});e.create({extenalID:"10",status_code:"A",description:undefined,validFrom:moment(new Date,"YYYY-MM-DD HH:mm:ss.SS"),validTo:moment("9999-12-31","YYYY-MM-DD HH:mm:ss.SS"),quantity:1,currency_ID:undefined,lineOfBusiness:this._getLobSelectedTab(),serviceNumber_ID:undefined,price:undefined},false,false,false);e.attachCreateCompleted(function(e){this.getModel().refresh()},this)}})});