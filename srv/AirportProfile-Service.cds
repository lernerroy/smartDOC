using com.legstate.smartdoc as smartdoc 
    from '../db/data-model';



@path : '/browse'
@impl : './AirportProfile-Draft.js'
service smartDOCService { 

//////////////////////////////////////////////////////////////////
// Airport Profile Services
//////////////////////////////////////////////////////////////////
    entity PurHeader
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.PurHeader;

    entity PurItems
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.PurItems;


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
// Trip Record Services
//////////////////////////////////////////////////////////////////
    @cds.odata.valuelist
    entity TR_Airports 
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TR_Airports;

    @cds.odata.valuelist
    entity TR_Carriers 
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TR_Carriers;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity TR_Currencies
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.TR_Currencies;


    
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
    entity PurchaseOrganizations
    // @(restrict: [ { grant: ['READ'], to: ['Admin','User']},
    //               { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.PurchaseOrganizations;
    
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

};