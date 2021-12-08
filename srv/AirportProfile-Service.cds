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

@path : '/draft'
service smartDOCDraft { 

    entity Airports @(restrict : [{
        grant : ['*'],
        to    : 'Admin'
    }]) as projection on smartdoc.Airports;

    entity Carriers @(restrict : [{
        grant : ['*'],
        to    : 'Admin'
    }]) as projection on smartdoc.Carriers;


    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity CompanyCodes @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.CompanyCodes;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity ControlKeys @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.ControlKeys;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity MaterialGroups @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.MaterialGroups;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity OrderTypes @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.OrderTypes;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity PurchaseOrgs @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.PurchaseOrganizations;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity WorkCenters @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.WorkCenters;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity Plants @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.Plants;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity TR_Carriers @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.TR_Carriers;

    @cds.odata.valuelist
    @cds.autoexpose  @readonly
    entity TR_Airports @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on smartdoc.TR_Airports;


// Enable Draft For Airport and Carrier
    annotate smartdoc.Carriers with @fiori.draft.enabled;
    annotate smartdoc.Airports with @fiori.draft.enabled;
    annotate Airports with @odata.draft.enabled;
    annotate Carriers with @odata.draft.enabled;
};