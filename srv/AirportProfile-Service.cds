using com.legstate.smartdoc as smartdoc
        from '../db/data-model';


annotate smartdoc with @(requires : [
    'Admin',
    'API_user',
    'User'
]);

annotate smartdoc with @(restrict : [
    {
        grant : [
            'READ',
            'WRITE'
        ],
        to    : 'API_user'
    },
    {
        grant : ['*'],
        to    : 'User'
    },
    {
        grant : ['*'],
        to    : 'Admin'
    }
]);

@path : '/browse'
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

annotate Carriers with {
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

