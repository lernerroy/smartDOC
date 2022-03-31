using com.legstate.smartdoc as smartdoc 
    from '../db/data-model';



@path : '/draft'
@impl : './AirportProfile-Draft.js'
service smartDOCDraft { 

//////////////////////////////////////////////////////////////////
// Airport Profile Services
//////////////////////////////////////////////////////////////////
    entity PurDocs
     @(restrict: [ { grant: ['*'], to: ['Admin','User']},
                   { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.PurDocs;
        
    entity TaskLists
     @(restrict: [ { grant: ['*'], to: ['Admin','User']},
                   { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TaskLists;
    
    entity Pur2TL
     @(restrict: [ { grant: ['*'], to: ['Admin','User']},
                   { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.Pur2TL;
 

//////////////////////////////////////////////////////////////////
// smartDOC Services
//////////////////////////////////////////////////////////////////
    entity Airports 
     @(restrict: [ { grant: ['*'], to: ['Admin','User']},
                  { grant: ['READ'], to: ['API_user']}])    
    as projection on smartdoc.Airports;

    entity Carriers 
     @(restrict: [ { grant: ['*'], to: ['Admin','User']},
                  { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.Carriers;
    




//////////////////////////////////////////////////////////////////
// SAP Services
//////////////////////////////////////////////////////////////////
    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity Plants 
    as projection on smartdoc.Plants;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity CompanyCodes  
    as projection on smartdoc.CompanyCodes;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity ControlKeys 
    as projection on smartdoc.ControlKeys;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity MaterialGroups  
    as projection on smartdoc.MaterialGroups;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity OrderTypes  
    as projection on smartdoc.OrderTypes;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity PurchaseOrganizations  
    as projection on smartdoc.PurchaseOrganizations;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity WorkCenters 
    as projection on smartdoc.WorkCenters;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity BusinessPartners 
    as projection on smartdoc.BusinessPartners;
    
    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity ServiceData
    as projection on smartdoc.ServiceData;
    

//////////////////////////////////////////////////////////////////
// Trip Record Services
//////////////////////////////////////////////////////////////////
    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity TR_Carriers 
    as projection on smartdoc.TR_Carriers;

    @cds.odata.valuelist
    entity TR_Airports  
    as projection on smartdoc.TR_Airports;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity TR_Currencies 
    as projection on smartdoc.TR_Currencies;



// Enable Draft For Airport and Carrier
    annotate smartdoc.Carriers with @fiori.draft.enabled;
    annotate smartdoc.Airports with @fiori.draft.enabled;
    annotate smartdoc.PurDocs with @fiori.draft.enabled;
    annotate smartdoc.TaskLists with @fiori.draft.enabled;
    
    annotate PurDocs with @odata.draft.enabled;
    annotate TaskLists with @odata.draft.enabled;
    annotate Airports with @odata.draft.enabled;
    annotate Carriers with @odata.draft.enabled;
};