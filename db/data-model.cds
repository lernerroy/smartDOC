namespace com.legstate.smartdoc;

//using { SAP_CF_BusinessRules_Repository } from '../srv/external/SAP_CF_BusinessRules_Repository';
using {temporal} 
    from '@sap/cds/common';
using {managed} 
    from '@sap/cds/common';
using {sap.common.CodeList} 
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
        carrier              : Association to one TR_Carriers;
            //@assert.integrity:false;
        companyCode          : Association to one CompanyCodes;
            //@assert.integrity:false;
        mainWorkCenter       : Association to one WorkCenters;
            //@assert.integrity:false;
        orderType            : Association to one OrderTypes;
            //@assert.integrity:false;
        awbOrderType         : Association to one OrderTypes;
            //@assert.integrity:false;
        purchaseOrganization : Association to one PurchaseOrganizations;
            //@assert.integrity:false;
        plant                : Association to one Plants;
            //@assert.integrity:false;
        materialGroup        : Association to one MaterialGroups;
            //@assert.integrity:false;
        controlKey           : Association to one ControlKeys;
            //@assert.integrity:false;
// purchasingGroup       : String(3);
// profitCenter          : String(10);
};

    

/////////////////////////////////////////////////////////////
// Entities Declaration of Airport Profile 
/////////////////////////////////////////////////////////////

type ObjectType : String
    enum { contract; profile; };
type DocumentType : String 
    enum { airport; catering; };

type LOB : String 
    enum { 
        Airport = 'AC'; 
        Cargo = 'CG'; 
        Engineering = 'EG'; 
        Overflight = 'OV';
        Navigation = 'NV';
        Crew = 'CR';
        fuel = 'FU';
        Catering = 'CT';
        Airwaybill = 'AB';
        };
 
entity DomesticIntl : CodeList {
    key code : String enum {
        domestic = 'D';
        international = 'I';
    };
};

entity Status : CodeList {
    key code : String enum {
        deleted = 'D';
        inactive = 'I';
        active = 'A';
    };
};

entity ServiceType : CodeList {
    key code : String enum {
        passenger = 'P';
        freight = 'F';
    };
};



entity PurDocs : managed, temporal {
    key ID                   : UUID @(Core.Computed : true);
        extenalID            : Integer;
        objectType           : ObjectType @mandatory;
        documentDate         : Date @mandatory;
        description          : String @mandatory;
        airport              : Association to one TR_Airports @mandatory @assert.integrity:false;
        status               : Association to Status @mandatory;
        carrier              : Association to one TR_Carriers @mandatory @assert.integrity:false;
        purchaseOrganization : Association to one PurchaseOrganizations @mandatory @assert.integrity:false;
        documentType         : DocumentType @mandatory;
        vendor               : Association to one BusinessPartners @mandatory @assert.integrity:false;
        aribaIndicator       : String;
        //paymentTerms
        items : Composition of many PurItems on items.up_ = $self;
};

entity PurItems : managed, temporal {
    key up_                  : Association to PurDocs;
    key ID                   : UUID @(Core.Computed : true);
        extenalID            : String(5) @mandatory;
        description          : String @mandatory;
        serviceNumber        : Association to one ServiceData @mandatory @assert.integrity:false;
        status               : Association to Status @mandatory;
        lineOfBusiness       : LOB @mandatory;
        quantity             : Decimal(8,2) @mandatory;
        price                : Decimal(11,2) @mandatory;
        currency             : Association to one TR_Currencies @mandatory @assert.integrity:false;
        brf_id               : String; 
        taskListItem         : Association to many Pur2TL on taskListItem.purItem = $self @assert.integrity:false;
};




entity TaskLists : managed, temporal  {
    key ID                   : UUID @(Core.Computed : true);
        extenalID            : Integer;
        objectType           : ObjectType;
        documentDate         : Date;
        description          : String;
        origin               : Association to one TR_Airports @assert.integrity:false;
        destination          : Association to one TR_Airports @assert.integrity:false;
        status               : Association to Status;
        documentType         : DocumentType;
        items : Composition of many TaskListItems on items.up_ = $self @assert.integrity:false;
};


entity TaskListItems : managed, temporal {
    key up_                  : Association to TaskLists;
    key ID                   : UUID @(Core.Computed : true);
        extenalID            : String(5);
        description          : String;
        purDoc               : Association to PurDocs @assert.integrity:false;
        purItem              : Association to many Pur2TL on purItem.taskListItem = $self @assert.integrity:false;
        status               : Association to Status;
        lineOfBusiness       : LOB;
        jobIndicator         : Boolean;
        additionalIndicator  : Boolean;
        domesticIntl         : Association to DomesticIntl;
        serviceType          : Association to ServiceType;
        tailNumber           : String;
};

entity Pur2TL {
  key taskListItem : Association to TaskListItems @assert.integrity:false;
  key purItem : Association to PurItems @assert.integrity:false;
}