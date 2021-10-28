using my.smartdoc as my from '../db/data-model';

service smartDOCService { 

    entity airports_enh as projection on my.airports_enh;
    entity carriers_enh as projection on my.carriers_enh;
    
}




annotate airports_enh with {
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
    purchasingGroup;
    controlKey;
    profitCenter;
};
