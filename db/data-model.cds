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


// Begin of Comment Should not be needed -- Nuvneet
// type plant : Association to PlantService.PlantSet;
// type companyCode : Association to CompanyCodeService.A_CompanyCode;
// type materialGroup : Association to materialGroupService.A_ProductGroup;
// type orderType : Association to OrderTypeService.A_OrderTypeSet;
// type purchaseOrganization : Association to purchaseOrgService.PurchasingOrganizationSet;
// type WorkCenter : Association to WorkCenterService.WorkCenterSet;
// type ControlKey : Association to ControlKeyService.ControlKeySet;
// type airportCode : Association to TripService.Airports;
// type carrierCode : Association to TripService.Carriers;
// End of Comment


/////////////////////////////////////////////////////////////
// View Declaration for Remote Services
/////////////////////////////////////////////////////////////
view Plants as
    select from PlantService.PlantSet {
        key Werks as ID,
            Name1 as Name
    };

view TR_Airports as
    select from TripService.Airports {
        key code  as ID,
            name  as name,
            descr as descr,
            aptcd_icao,
    };

view TR_Carriers as
    select from TripService.Carriers {
        key code  as ID,
            name  as name,
            descr as descr,
    };

view companyCode as select from CompanyCodeService.A_CompanyCode;
view materialGroup as select from materialGroupService.A_ProductGroup;
view orderType as select from OrderTypeService.A_OrderTypeSet;
view purchaseOrganization as select from purchaseOrgService.PurchasingOrganizationSet;
view WorkCenter as select from WorkCenterService.WorkCenterSet;
view ControlKey as select from ControlKeyService.ControlKeySet;
view carrierCode as select from TripService.Carriers;

@assert.unique : {airport : [airport], }
entity Airports : managed {
    key ID      : UUID @(Core.Computed : true);
        //code    : String(3);
       // @Common.ValueListForValidation : 'true'
        airport : Association to one TR_Airports; //on code = airport.ID;
        plant   : Association to one Plants;
}

@assert.unique : {carrier : [carrier], companyCode : [companyCode] }
entity Carriers : managed {
    key ID                   : UUID @(Core.Computed : true);
        //@Common.ValueListForValidation : 'true'
        carrier              : Association to one TR_Carriers;
        companyCode          : Association to one companyCode;
        mainWorkCenter       : Association to one WorkCenter;
        orderType            : Association to one orderType;
        awbOrderType         : Association to one orderType;
        purchaseOrganization : Association to one purchaseOrganization;
        plant                : Association to one Plants;
        materialGroup        : Association to one materialGroup;
        controlKey           : Association to one ControlKey;
// purchasingGroup       : String(3);
// profitCenter          : String(10);
}
