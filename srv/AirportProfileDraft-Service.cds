using com.legstate.smartdoc as smartdoc from '../db/data-model';
using {TripService} from '../srv/external/cat-service';
using {ZGW_LS_FO_PLANT_SRV as PlantService} from './external/ZGW_LS_FO_PLANT_SRV';
using {API_COMPANYCODE_SRV as CompanyCodeService} from './external/OP_API_COMPANYCODE_SRV';
using {ZGW_LS_FO_CONTROL_KEY_SRV as ControlKeysService} from './external/ControlKey';
using {ZGW_LS_FO_ORDER_TYPE_SRV as OrderTypeService} from '../srv/external/OrderType';
using {API_PRODUCTGROUP_SRV as materialGroupService} from '../srv/external/OP_API_PRODUCTGROUP_SRV_0001';
using {ZGW_LS_FO_PURCHASE_ORG_SRV as purchaseOrgService} from '../srv/external/PurchaseOrg';
using {ZGW_LS_FO_WORK_CENTER_SRV as WorkCenterService} from '../srv/external/WORKCENTER';


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

    entity CompanyCodes @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on CompanyCodeService.A_CompanyCode;

    entity ControlKeys @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on ControlKeysService.ControlKeySet;

    entity MaterialGroups @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on materialGroupService.A_ProductGroupText;

    entity OrderTypes @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on OrderTypeService.A_OrderTypeSet;

    entity PurchaseOrgs @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on purchaseOrgService.PurchasingOrganizationSet;

    entity WorkCenters @(restrict : [{
        grant : ['READ'],
        to    : 'Admin'
    }]) as projection on WorkCenterService.WorkCenterSet;





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

}

// Annotate Source to display text on value help
annotate smartdoc.Plants with {
    ID @Common : {
        Label           : 'Plant',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.TR_Airports with {
    ID @Common : {
        Label           : 'Airport',
        //for the editable form and selection in valuelists
        Text            : name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.TR_Carriers with {
    ID @Common : {
        Label           : 'Carrier',
        //for the editable form and selection in valuelists
        Text            : name,
        TextArrangement : #TextFirst,
    }
};




// Enable Draft For Airport and CArrier
annotate smartDOCDraft.Carriers with @odata.draft.enabled;
annotate smartdoc.Carriers with @fiori.draft.enabled;
annotate smartdoc.Airports with @fiori.draft.enabled;
annotate smartDOCDraft.Airports with @odata.draft.enabled;





/////////////////////////////////////////////////////////////
// Start of Carrier Draft UI
/////////////////////////////////////////////////////////////
annotate smartDOCDraft.Carriers with @(
    Common.SemanticKey : [ID],
    UI                 : {
        Identification  : [{Value : ID}],
        title           : 'Carrier',
        SelectionFields : [
            ID,
            companyCode_CompanyCode,
            mainWorkCenter_WorkCenter,
            orderType_OrderType,
            // plant_Werks,
            materialGroup_MaterialGroup

        ],

        LineItem        : [

            //{Value : ID, },
            // {Value : plant_Werks, },
            {Value : carrier_ID},
            {Value : mainWorkCenter_WorkCenter, },
            {Value : mainWorkCenter_WorkCenter, },
            {Value : orderType_OrderType, },
            {Value : materialGroup_MaterialGroup, },
        ],
        Facets          : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : 'General',
            Target : '@UI.FieldGroup'
        }, ],
        FieldGroup      : {Data : [

            //{Value : ID, },
            // {Value : plant_Werks, },
            {Value : carrier_ID},
            {Value : companyCode_CompanyCode },
            {Value : mainWorkCenter_WorkCenter, },
            {Value : orderType_OrderType, },
            {Value : awbOrderType_OrderType, },
            {Value : materialGroup_MaterialGroup, },
            {Value : purchaseOrganization_PurchasingOrg, },
            {Value : controlKey_ControlKey, },

        ]},

    },
);

annotate smartDOCDraft.carrier with @(
 UI: {
  HeaderInfo: {
   TypeName: 'Carrier Code',
   TypeNamePlural: 'Carrier Code',
   Title: {Value: ID},
   Description: {Value: ID}
  },
 }
);



/////////////////////////////////////////////////////////////
// Start of Airport Draft UI
/////////////////////////////////////////////////////////////

annotate smartDOCDraft.TR_Airports with {
    ID @Common : {Label : 'Airport Code'};
    aptcd_icao @Common : { Label : 'Airport ICAO Code' };
    descr   @Common : {Label : 'Description'};
    name @Common : {Label : 'Airport Name' };
};

annotate smartDOCDraft.Airports with {
    airport @Common : {Label : 'Airport'};
    //airport @Common : { Label : 'Airport ICAO' } ;
    descr   @Common : {Label : 'Description'};
    airport @(
        title                  : 'Airport',
        Common.Text            : airport.name,
        Common.TextArrangement : #TextFirst
    );
    plant   @(
        title                  : 'Plant',
        Common.Text            : plant.Name,
        Common.TextArrangement : #TextFirst
    )
};

annotate smartDOCDraft.Airports {
    airport @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'TR_Airports',
        Label           : 'Description',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : airport_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'aptcd_icao'
            },
        ],
        SearchSupported : true
    };


    plant   @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'Plants',
        Label           : 'Description',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : plant_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Name'
            },
        ],
        SearchSupported : true
    };
};


// Airports
annotate smartDOCDraft.Airports with @(
    Common.SemanticKey : [airport_ID],
    UI                 : {
        HeaderInfo      : {
            TypeName       : 'Airport',
            TypeNamePlural : 'Airports',
            Title          : {
                $Type : 'UI.DataField',
                Value : airport_ID
            },
            Description    : {
                $Type : 'UI.DataField',
                Value : airport.name
            }
        },
        Identification  : [{Value : airport_ID}],

        SelectionFields : [
            airport_ID,
            plant_ID
        ],

        LineItem        : [
            {Value : airport_ID},
            {Value : plant_ID}
        ],
        Facets          : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : 'General',
            Target : '@UI.FieldGroup'
        }],
        FieldGroup      : {
            Label : 'Airport Details',
            Data  : [
                {Value : airport_ID, Label : 'Airport Code' },
                //{Value : airport.name, Label : 'Airport Name' },
                {Value : plant_ID, Label : 'Plant Code' },
                //{Value : plant.Name, Label : 'Plant Name' },
                {Value : airport.aptcd_icao, Label : 'Airport ICAO Code' },
            ]
        },
    },
);
