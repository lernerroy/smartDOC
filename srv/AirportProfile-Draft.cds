using com.legstate.smartdoc as smartdoc 
    from '../db/data-model';



@path : '/draft'
@impl : './AirportProfile-Draft.js'
service smartDOCDraft { 

//////////////////////////////////////////////////////////////////
// Airport Profile Services
//////////////////////////////////////////////////////////////////
    entity PurDocs
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.PurDocs;

    // entity PurItems
    // // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    // //              { grant: ['READ'], to: ['API_user']}])
    // as projection on smartdoc.PurItems;
        
    entity TaskLists
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TaskLists;
    
    entity Pur2TL
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.Pur2TL;
 

//////////////////////////////////////////////////////////////////
// smartDOC Services
//////////////////////////////////////////////////////////////////
    entity Airports 
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])    
    as projection on smartdoc.Airports;

    entity Carriers 
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.Carriers;
    




//////////////////////////////////////////////////////////////////
// SAP Services
//////////////////////////////////////////////////////////////////
    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity Plants
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.Plants;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity CompanyCodes 
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.CompanyCodes;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity ControlKeys
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.ControlKeys;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity MaterialGroups 
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.MaterialGroups;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity OrderTypes 
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.OrderTypes;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity PurchaseOrganizations 
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.PurchaseOrganizations;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity WorkCenters
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.WorkCenters;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity BusinessPartners
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.BusinessPartners;
    
    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity ServiceData
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.ServiceData;


//////////////////////////////////////////////////////////////////
// Trip Record Services
//////////////////////////////////////////////////////////////////
    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity TR_Carriers
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TR_Carriers;

    @cds.odata.valuelist
    entity TR_Airports 
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TR_Airports;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity TR_Currencies
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TR_Currencies;



// Enable Draft For Airport and Carrier
    annotate smartdoc.Carriers with @fiori.draft.enabled;
    annotate smartdoc.Airports with @fiori.draft.enabled;
    annotate smartdoc.PurDocs with @fiori.draft.enabled;
    //annotate smartdoc.PurItems with @fiori.draft.enabled;
    annotate smartdoc.TaskLists with @fiori.draft.enabled;
    //annotate smartdoc.TLItems with @fiori.draft.enabled;
    annotate PurDocs with @odata.draft.enabled;
    //annotate PurItems with @odata.draft.enabled;
    annotate TaskLists with @odata.draft.enabled;
    //annotate TLItems with @odata.draft.enabled;
    annotate Airports with @odata.draft.enabled;
    annotate Carriers with @odata.draft.enabled;
};