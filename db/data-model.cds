namespace com.legstate.smartdoc;

using { TripService } 
        from '../srv/external/TripService';
using { ZGW_LS_FO_PLANT_SRV as PlantService } 
        from '../srv/external/ZGW_LS_FO_PLANT_SRV';
using { ZGW_LS_FO_ORDER_TYPE_SRV as OrderTypeService } 
        from '../srv/external/OrderType';
using { API_COMPANYCODE_SRV as CompanyCodeService } 
        from '../srv/external/OP_API_COMPANYCODE_SRV';
using { API_PRODUCTGROUP_SRV as materialGroupService } 
        from '../srv/external/OP_API_PRODUCTGROUP_SRV_0001';


type plant : Association to 
        PlantService.PlantSet;
type companyCode : Association to 
        CompanyCodeService.A_CompanyCode;
type materialGroup : Association to 
        materialGroupService.A_ProductGroup;
type orderType : Association to 
        OrderTypeService.A_OrderTypeSet;

type airportCode : Association to TripService.airports;
type carrierCode : Association to TripService.carriers;

entity Airports {
    key code : airportCode;
    plant  : plant;
}

entity Carriers {
    key code                : carrierCode;
    companyCode             : companyCode;
    mainWorkCenter          : String(8);
    orderType               : orderType;
    awbOrderType            : orderType;
    purchaseOrganization    : String(4);
    plant                   : plant;
    materialGroup           : materialGroup;
    controlKey              : String(4);
   // purchasingGroup         : String(3);
   // profitCenter            : String(10);
}
