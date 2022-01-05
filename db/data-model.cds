namespace com.legstate.smartdoc;

//using { SAP_CF_BusinessRules_Repository } from '../srv/external/SAP_CF_BusinessRules_Repository';

using {managed} 
    from '@sap/cds/common';
using cuid 
    from '@sap/cds/common';
using {TripService} 
    from '../srv/external/cat-service';
using {ZGW_LS_FO_PLANT_SRV as PlantService} 
    from '../srv/external/ZGW_LS_FO_PLANT_SRV';
using {ZGW_LS_FO_ORDER_TYPE_SRV as OrderTypeService} 
    from '../srv/external/OrderType';
using {API_COMPANYCODE_SRV as CompanyCodeService} 
    from '../srv/external/OP_API_COMPANYCODE_SRV';
using {API_PRODUCTGROUP_SRV as materialGroupService} 
    from '../srv/external/OP_API_PRODUCTGROUP_SRV_0001';
using {ZGW_LS_FO_PURCHASE_ORG_SRV as purchaseOrgService} 
    from '../srv/external/PurchaseOrg';
using {ZGW_LS_FO_WORK_CENTER_SRV as WorkCenterService} 
    from '../srv/external/WORKCENTER';
using {ZGW_LS_FO_CONTROL_KEY_SRV as ControlKeyService}  
    from '../srv/external/ControlKey';
using {API_BUSINESS_PARTNER as BusPrtnrService} 
    from '../srv/external/ZGW_LS_FO_BUSINESSPARTNER_SRV';
using {ZGW_LS_FO_SERVICE_SRV as ServiceDataService} 
    from '../srv/external/ServiceData';


/////////////////////////////////////////////////////////////
// View Declaration for SAP Services
/////////////////////////////////////////////////////////////
view Plants as
    select from PlantService.PlantSet {
        key Werks as ID,
            Name1 as Name
    };

view CompanyCodes as
    select from CompanyCodeService.A_CompanyCode {
        key CompanyCode     as ID,
            CompanyCodeName as Name,
            CityName,
            Country,
            Currency
    };

view MaterialGroups as
    select from materialGroupService.A_ProductGroupText {
        key MaterialGroup  as ID,
        MaterialGroupName as Name
    };
    
view OrderTypes as
    select from OrderTypeService.A_OrderTypeSet {
        key  OrderType as ID,
        OrderTypeDescription as Name,
        OrderCategory
    };

view PurchaseOrganizations as
    select from purchaseOrgService.PurchasingOrganizationSet {
        key  PurchasingOrg as ID,
        Description as Name
    };

view WorkCenters as
    select from WorkCenterService.WorkCenterSet {
        key  WorkCenter as ID,
        Description as Name
    };

view ControlKeys as
    select from ControlKeyService.ControlKeySet {
        key  ControlKey as ID,
        ControlKeyText as Name,
        Application,
    };

view BusinessPartners as
    select from BusPrtnrService.A_BusinessPartner {
        key BusinessPartner as ID,
        BusinessPartnerFullName as Name
    };

view ServiceData as
    select from ServiceDataService.A_ServiceDataSet {
        key Activity as ID,
        Activitydesc as Name
    };


/////////////////////////////////////////////////////////////
// View Declaration for Trip Record Services
/////////////////////////////////////////////////////////////
view TR_Currencies as
    select from TripService.Currencies {
        key code  as ID,
            name  as Name
    };

view TR_Airports as
    select from TripService.Airports {
        key code  as ID,
            name  as name,
            descr as descr,
            aptcd_icao,
            country_code,
            lat_coord,
            lat_coord_sign_code,
            lat_coord_sign,
            lon_coord,
            lon_coord_sign_code,
            lon_coord_sign,
            country_code_code
    };

view TR_Carriers as
    select from TripService.Carriers {
        key code  as ID,
            name  as name,
            descr as descr,
    };
    

/////////////////////////////////////////////////////////////
// View Declaration for BRF services
/////////////////////////////////////////////////////////////
// view BRF_Pricing as
//     select from BRFService.BRFs {
//         key code  as ID,
//             name  as Name
//     };

     

/////////////////////////////////////////////////////////////
// Entities Declaration of smartDOC 
/////////////////////////////////////////////////////////////
@assert.unique : {airport : [airport], }
entity Airports : managed {
    key ID      : UUID @(Core.Computed : true);
    airport : Association to one TR_Airports 
        @assert.integrity:false;
    plant   : Association to one Plants 
        @assert.integrity:false;
};

@assert.unique : {carrier     : [carrier], }
entity Carriers : managed {
    key ID                   : UUID @(Core.Computed : true);
        carrier              : Association to one TR_Carriers 
            @assert.integrity:false;
        companyCode          : Association to one CompanyCodes
            @assdert.integrity:false;
        mainWorkCenter       : Association to one WorkCenters
            @assert.integrity:false;
        orderType            : Association to one OrderTypes
            @assert.integrity:false;
        awbOrderType         : Association to one OrderTypes 
            @assert.integrity:false;
        purchaseOrganization : Association to one PurchaseOrganizations
            @assert.integrity:false;
        plant                : Association to one Plants
            @assert.integrity:false;
        materialGroup        : Association to one MaterialGroups
            @assert.integrity:false;
        controlKey           : Association to one ControlKeys
            @assert.integrity:false;
// purchasingGroup       : String(3);
// profitCenter          : String(10);
};

    

/////////////////////////////////////////////////////////////
// Entities Declaration of Airport Profile 
/////////////////////////////////////////////////////////////
type Status : String 
    enum { deleted; inactive; active; };
type ObjectType : String
    enum { contract; profile; };
type DocumentType : String 
    enum { airport; catering; };
type LOB : String 
    enum { airport; cargo; engineering; overflight; crew; fuel; catering; };
type DomesticIntl : String 
    enum { domestic ; international; };
type AdditionalIndicator : String 
    enum { routine; additional; };


entity PurHeader : managed {
    key ID                   : UUID @(Core.Computed : true);
        extenalID            : Integer;
        objectType           : ObjectType;
        documentDate         : Date;
        description          : String;
        airport              : Association to one TR_Airports;
        origin               : Association to one TR_Airports;
        destination          : Association to one TR_Airports;
        status               : Status;
        validityFrom         : Date;
        validityTo           : Date;
        carrier              : Association to one TR_Carriers;
        purchaseOrganization : Association to one PurchaseOrganizations;
        documentType         : DocumentType;
        vendor               : Association to one BusinessPartners;
        //paymentTerms
        aribaIndicator       : String;
        items  : Association[1,*] to PurItems on items.purHeader = $self;
};

entity PurItems : managed {
    key purHeader            : Association to PurHeader;
    key ID                   : String(5);
        description          : String;          
        serviceNumber        : Association to one ServiceData;
        status               : Status;
        validityFrom         : Date;
        validityTo           : Date;
        validityFromTime     : Time;
        validityToTime       : Time;
        lineOfBusiness       : LOB;
        vendor               : Association to one BusinessPartners;
        jobIndicator         : Boolean;
        domesticIntl         : DomesticIntl;
        carrier              : Association to one TR_Carriers;
        quantity             : Decimal(8,2);
        additionalIndicator  : AdditionalIndicator;
        price                : Decimal(11,2);
        currency             : Association to one TR_Currencies;
        brf_id               : String; //Association to one BRF_Pricing;
};



entity TLHeader : managed {
    key ID                   : UUID @(Core.Computed : true);
        extenalID            : Integer;
        objectType           : ObjectType;
        documentDate         : Date;
        description          : String;
        origin               : Association to one TR_Airports;
        destination          : Association to one TR_Airports;
        status               : Status;
        validityFrom         : Date;
        validityTo           : Date;
        documentType         : DocumentType;
        items                : Association[1,*] to PurItems 
            on items.purHeader = $self;
};

entity TLItems : managed {
    key TLHeader             : Association to PurHeader;
    key ID                   : String(5);
        description          : String;          
        purHeader            : Association to one PurHeader;
        purItem              : Association to one PurItems 
            on purItem.ID = $self.purItem and purHeader.ID = $self.purHeader;
        serviceNumber        : Association to one ServiceData;
        status               : Status;
        validityFrom         : Date;
        validityTo           : Date;
        validityFromTime     : Time;
        validityToTime       : Time;
        lineOfBusiness       : LOB;
        jobIndicator         : Boolean;
        domesticIntl         : DomesticIntl;
};