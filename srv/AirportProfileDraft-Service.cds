using com.legstate.smartdoc as smartdoc
        from '../db/data-model';
using { TripService } 
        from '../srv/external/cat-service';
using { ZGW_LS_FO_PLANT_SRV as PlantService } 
        from './external/ZGW_LS_FO_PLANT_SRV';
using { API_COMPANYCODE_SRV as CompanyCodeService } 
        from './external/OP_API_COMPANYCODE_SRV';
using { ZGW_LS_FO_CONTROL_KEY_SRV as ControlKeysService } 
        from './external/ControlKey';
using { ZGW_LS_FO_ORDER_TYPE_SRV as OrderTypeService } 
        from '../srv/external/OrderType';
using { API_PRODUCTGROUP_SRV as materialGroupService } 
        from '../srv/external/OP_API_PRODUCTGROUP_SRV_0001';
using { ZGW_LS_FO_PURCHASE_ORG_SRV as purchaseOrgService } 
        from '../srv/external/PurchaseOrg';
using { ZGW_LS_FO_WORK_CENTER_SRV as WorkCenterService } 
        from '../srv/external/WORKCENTER';
        

@path : '/draft'
service smartDOCDraft { 

    entity Airports_enh 
    @(restrict: [ { grant: ['*'], to: 'Admin'}])
    as projection on smartdoc.Airports_enh;
    entity Carriers_enh 
    @(restrict: [ { grant: ['*'], to: 'Admin'}])
    as projection on smartdoc.Carriers_enh;
    entity Plants
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on PlantService.PlantSet;
    entity CompanyCodes 
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on CompanyCodeService.A_CompanyCode;
    entity ControlKeys 
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on ControlKeysService.ControlKeySet;
    entity MaterialGroups 
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on materialGroupService.A_ProductGroupText;
    entity OrderTypes 
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on OrderTypeService.A_OrderTypeSet;
    entity PurchaseOrgs 
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on purchaseOrgService.PurchasingOrganizationSet;
    entity WorkCenters 
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on WorkCenterService.WorkCenterSet;

    entity Airports
    // @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on TripService.Airports;
    entity Carriers 
    @(restrict: [ { grant: ['READ'], to: 'Admin'}])
    as projection on TripService.Carriers;

}


// Enable Draft For Airport and CArrier (For Demo Purpose, Refinement may be needed)
annotate smartdoc.Carriers_enh with @fiori.draft.enabled;
annotate smartDOCDraft.Carriers_enh with @odata.draft.enabled;
annotate smartdoc.Airports_enh with @fiori.draft.enabled;
annotate smartDOCDraft.Airports_enh with @odata.draft.enabled;


// Start of Airport Draft UI

// Airports
annotate smartDOCDraft.Airports_enh  with @(
Common.SemanticKey: [code.name],
UI : {
Identification: [{Value:code.name}],
title: name,
    SelectionFields     : [

        code.name,
        plant.Werks
    ],

    LineItem            : [

        {Value : code.name, Label : 'Name'},
        {Value : plant.Werks, Label : 'Plant'}
    ],
    Facets              : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : 'General',
            Target : '@UI.FieldGroup#General'
        },
    ],
    FieldGroup #General : {Data : [
        
        {Value : code.name, Label : 'Name'},
        {Value : plant.Werks, Label : 'Plant'}

    ]},

}, );



