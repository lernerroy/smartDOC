namespace com.legstate.smartdoc;

using {managed} from '@sap/cds/common';
using cuid from '@sap/cds/common';
using {TripService} from '../srv/external/cat-service';
using {ZGW_LS_FO_PLANT_SRV as PlantService} from '../srv/external/ZGW_LS_FO_PLANT_SRV';
using {ZGW_LS_FO_ORDER_TYPE_SRV as OrderTypeService} from '../srv/external/OrderType';
using {API_COMPANYCODE_SRV as CompanyCodeService} from '../srv/external/OP_API_COMPANYCODE_SRV';
using {API_PRODUCTGROUP_SRV as materialGroupService} from '../srv/external/OP_API_PRODUCTGROUP_SRV_0001';
using {ZGW_LS_FO_PURCHASE_ORG_SRV as purchaseOrgService} from '../srv/external/PurchaseOrg';
using {ZGW_LS_FO_WORK_CENTER_SRV as WorkCenterService} from '../srv/external/WORKCENTER';
using {ZGW_LS_FO_CONTROL_KEY_SRV as ControlKeyService} from '../srv/external/ControlKey';
using {API_BUSINESS_PARTNER as BusPrtnrService} from '../srv/external/ZGW_LS_GW_BusinesPartner';



/////////////////////////////////////////////////////////////
// View Declaration for Remote Services
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

// view awbOrderTypes as
//     select from OrderTypeService.A_OrderTypeSet {
//         key  OrderType as ID,
//         OrderTypeDescription as Name,
//         OrderCategory
//     };

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


@assert.unique : {airport : [airport], }
entity Airports : managed {
    key ID      : UUID @(Core.Computed : true);
    airport : Association to one TR_Airports 
        @assert.integrity:false;
    plant   : Association to one Plants 
        @assert.integrity:false;
};
    //companyCode : [companyCode]
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

type Status : String enum { deleted; inactive; active; };
type ObjectType : String enum { contract; profile; };
type DocumentType : String enum { airport; catering; };

entity PurHeader : managed {
    key ID                   : UUID @(Core.Computed : true);
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
};