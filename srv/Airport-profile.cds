using com.legstate.smartdoc as smartdoc
        from '../db/data-model';
using { ZGW_LS_FO_PLANT_SRV as PlantService } 
        from './external/ZGW_LS_FO_PLANT_SRV';



service smartDOCService { 

    entity Airports as projection on smartdoc.Airports;
    entity Carriers as projection on smartdoc.Carriers;
    
}

annotate Airports with {
    airport;
    plant;
    @readonly companyCode;
    @readonly carrierCode;
};

annotate carriers_enh with {
    carrier_code;
    companyCode;
    mainWorkCenter;
    orderType;
    awbOrderType;
    purchaseOrganization;
    plant;
    materialGroup;
    //purchasingGroup; not needed for now
    controlKey;
    //profitCenter; not needed for now
};