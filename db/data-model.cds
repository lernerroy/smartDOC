namespace com.legstate.smartdoc;

using { TripService } 
        from '../srv/external/cat-service';
using { ZGW_LS_FO_PLANT_SRV as PlantService } 
        from '../srv/external/ZGW_LS_FO_PLANT_SRV';
using { ZGW_LS_FO_ORDER_TYPE_SRV as OrderTypeService } 
        from '../srv/external/OrderType';
using { API_COMPANYCODE_SRV as CompanyCodeService } 
        from '../srv/external/OP_API_COMPANYCODE_SRV';
using { API_PRODUCTGROUP_SRV as materialGroupService } 
        from '../srv/external/OP_API_PRODUCTGROUP_SRV_0001';
using { ZGW_LS_FO_PURCHASE_ORG_SRV as purchaseOrgService } 
        from '../srv/external/PurchaseOrg';
using { ZGW_LS_FO_WORK_CENTER_SRV as WorkCenterService } 
        from '../srv/external/WORKCENTER';
using { ZGW_LS_FO_CONTROL_KEY_SRV as ControlKeyService } 
        from '../srv/external/ControlKey';



type plant : Association to 
        PlantService.PlantSet;
type companyCode : Association to 
        CompanyCodeService.A_CompanyCode;
type materialGroup : Association to 
        materialGroupService.A_ProductGroup;
type orderType : Association to 
        OrderTypeService.A_OrderTypeSet;
type purchaseOrganization : Association to 
        purchaseOrgService.PurchasingOrganizationSet;
type WorkCenter : Association to 
        WorkCenterService.WorkCenterSet;
type ControlKey : Association to 
        ControlKeyService.ControlKeySet;

type airportCode : Association to TripService.Airports;
type carrierCode : Association to TripService.Carriers;

entity Airports_enh {
    key code : airportCode;
    plant    : plant;
}

entity Carriers_enh {
    key code              : carrierCode;
    companyCode           : companyCode;
    mainWorkCenter        : WorkCenter;
    orderType             : orderType;
    awbOrderType          : orderType;
    purchaseOrganization  : purchaseOrganization;
    plant                 : plant;
    materialGroup         : materialGroup;
    controlKey            : ControlKey;
   // purchasingGroup       : String(3);
   // profitCenter          : String(10);
}
