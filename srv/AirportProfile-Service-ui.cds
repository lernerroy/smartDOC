using smartDOCService 
    from './AirportProfile-Service';
using com.legstate.smartdoc as smartdoc 
    from '../db/data-model';

annotate smartDOCService.TR_Airports with {
    ID @Common : {Label : '{i18n>AirportCode}'};
    aptcd_icao @Common : { Label : '{i18n>AirportICAOCode}' };
    descr   @Common : {Label : '{i18n>Description}'};
    name @Common : {Label : '{i18n>AirportName}' };
};

annotate smartDOCService.TR_Carriers with {
    ID @Common : {Label : '{i18n>CarrierCode}'};
    descr   @Common : {Label : '{i18n>Description}'};
    name @Common : {Label : '{i18n>CarrierName}' };
};

annotate smartDOCService.Airports with {
    airport @Common : {Label : '{i18n>Airport}'};
    //airport @Common : { Label : 'Airport ICAO Code' } ;
    descr   @Common : {Label : '{i18n>Description}'};
    airport @(
        title                  : '{i18n>Airport}',
        Common.Text            : airport.name,
        Common.TextArrangement : #TextFirst
    );
    plant   @(
        title                  : '{i18n>Plant}',
        Common.Text            : plant.Name,
        Common.TextArrangement : #TextFirst
    )
};

annotate smartDOCService.Carriers with {
    carrier @Common : {Label : '{i18n>Carrier}' };
    companyCode @Common : {Label : '{i18n>CompanyCode}' };
    mainWorkCenter @Common : {Label : '{i18n>WorkCenter}' };
    orderType @Common : {Label : '{i18n>OrderType}' };
    awbOrderType @Common : {Label : '{i18n>AWBOrderType}' };
    purchaseOrganization @Common : {Label : '{i18n>PurchaseOrganization}' };
    plant @Common : {Label : '{i18n>Plant}' };
    materialGroup @Common : {Label : '{i18n>MaterialGroup}' };
    //purchasingGroup; not needed for now
    controlKey @Common : {Label : '{i18n>ControlKey}' };
    //profitCenter; not needed for now

    // Annotation for Text
    carrier @(
        title                  : '{i18n>Carrier}',
        Common.Text            : carrier.name,
        Common.TextArrangement : #TextFirst
    );

    companyCode @(
        title                  : '{i18n>CompanyCode}',         
        Common.Text            : companyCode.Name,
        Common.TextArrangement : #TextFirst,
    );


    mainWorkCenter @(
        title                  : '{i18n>mainworkcenter}',         
        Common.Text            : mainWorkCenter.Name,
        Common.TextArrangement : #TextFirst,
    );

    orderType @(
        title                  : '{i18n>ordertype}',         
        Common.Text            : orderType.Name,
        Common.TextArrangement : #TextFirst,
    );

    awbOrderType @(
        title                  : '{i18n>awbordertype}',         
        Common.Text            : awbOrderType.Name,
        Common.TextArrangement : #TextFirst,
    );

    purchaseOrganization @(
        title                  : '{i18n>purchaseOrganization}',         
        Common.Text            : purchaseOrganization.Name,
        Common.TextArrangement : #TextFirst,
    );

    plant @(
        title                  : '{i18n>Plant}',
        Common.Text            : plant.Name,
        Common.TextArrangement : #TextFirst
    );

    materialGroup @(
        title                  : '{i18n>materialGroup}',         
        Common.Text            : materialGroup.Name,
        Common.TextArrangement : #TextFirst,
    );

    controlKey @(
        title                  : '{i18n>controlKey}',         
        Common.Text            : controlKey.Name,
        Common.TextArrangement : #TextFirst,
    );

};



annotate smartDOCService.Plants with {
    ID @Common : {Label : '{i18n>PlantCode}'};
    Name @Common : { Label : '{i18n>PlantName}' };
};

annotate smartDOCService.CompanyCodes with {
    ID @Common : {Label : '{i18n>CompanyCode}'};
    Name @Common : { Label : '{i18n>CompanyName}' };
    CityName @Common : {Label : '{i18n>CityName}'};
    Country @Common : {Label : '{i18n>Country}'};
    Currency @Common : {Label : '{i18n>Currency}'};
};

annotate smartDOCService.WorkCenters with {
    ID @Common : {Label : '{i18n>WorkCenterCode}'};
    Name @Common : {Label : '{i18n>WorkCenterName}'};
};

annotate smartDOCService.MaterialGroups with {
    ID @Common : {Label : '{i18n>MaterialGroupCode}'};
    Name @Common : {Label : '{i18n>MaterialGroupName}'};
};

annotate smartDOCService.OrderTypes with {
    ID @Common : {Label : '{i18n>OrderTypeCode}'};
    Name @Common : {Label : '{i18n>OrderTypeName}'};
    OrderCategory @Common : {Label : '{i18n>OrderCategory}'};
};

// annotate smartDOCService.awbOrderTypes with {
//     ID @Common : {Label : '{i18n>OrderTypeCode}'};
//     Name @Common : {Label : '{i18n>OrderTypeName}'};
//     OrderCategory @Common : {Label : '{i18n>OrderCategory}'};
// };

annotate smartDOCService.PurchaseOrganizations with {
    ID @Common : {Label : '{i18n>PurchasingOrgCode}'};
    Name @Common : {Label : '{i18n>PurchasingOrgName}'};
};

annotate smartDOCService.ControlKeys with {
    ID @Common : {Label : '{i18n>ControlKeyCode}'};
    Name @Common : {Label : '{i18n>ControlKeyName}'};
    Application @Common : {Label : '{i18n>Application}'};
};

@cds.odata.valuelist 
annotate smartDOCService.Plants{ };
@cds.odata.valuelist
annotate smartDOCService.CompanyCodes{ };
@cds.odata.valuelist
annotate smartDOCService.MaterialGroups{ };
@cds.odata.valuelist
annotate smartDOCService.OrderTypes{ };
// @cds.odata.valuelist
// annotate smartDOCService.awbOrderTypes{ };
@cds.odata.valuelist
annotate smartDOCService.PurchaseOrganizations{ };
@cds.odata.valuelist
annotate smartDOCService.WorkCenters{ };
@cds.odata.valuelist
annotate smartDOCService.ControlKeys{ };




//////////////////////////////////////////////////////////
// Annotate Source to display text on value help
//////////////////////////////////////////////////////////

annotate smartdoc.TR_Airports with {
    ID @Common : {
        Label           : '{i18n>Airport}',
        //for the editable form and selection in valuelists
        Text            : name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.TR_Carriers with {
    ID @Common : {
        Label           : '{i18n>Carrier}',
        //for the editable form and selection in valuelists
        Text            : name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.Plants with {
        ID @Common : { 
        Label : '{i18n>Plant}',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.CompanyCodes with {
        ID @Common : { 
        Label : '{i18n>CompanyCode}',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.MaterialGroups with {
        ID @Common : { 
        Label : '{i18n>materialGroup}',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.OrderTypes with {
        ID @Common : { 
        Label : '{i18n>orderType}',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};

// annotate smartdoc.awbOrderTypes with {
//         ID @Common : { 
//         Label : '{i18n>awborderType}',
//         //for the editable form and selection in valuelists
//         Text            : Name,
//         TextArrangement : #TextFirst,
//     }
// };

annotate smartdoc.PurchaseOrganizations with {
        ID @Common : { 
        Label : '{i18n>purchaseOrganization}',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.WorkCenters with {
        ID @Common : { 
        Label : '{i18n>WorkCenter}',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};

annotate smartdoc.ControlKeys with {
        ID @Common : { 
        Label : '{i18n>ControlKey}',
        //for the editable form and selection in valuelists
        Text            : Name,
        TextArrangement : #TextFirst,
    }
};



/////////////////////////////////////////////////////////////
// Start of Carrier Draft UI
/////////////////////////////////////////////////////////////

annotate smartDOCService.Carriers with {
    carrier @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'TR_Carriers',
        Label           : '{i18n>Description}',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : carrier_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },

        ],
        SearchSupported : true
    };


    companyCode @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'CompanyCodes',
        Label           : '{i18n>Description}',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : companyCode_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Name'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'CityName'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Country'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Currency'
            }
        ],
        SearchSupported : true
    };

    
    plant @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'Plants',
        Label           : '{i18n>Description}',
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

    mainWorkCenter @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'WorkCenters',
        Label           : '{i18n>Description}',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : mainWorkCenter_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Name'
            }
        ],
        SearchSupported : true
    };

    materialGroup @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'MaterialGroups',
        Label           : '{i18n>Description}',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : materialGroup_ID,
                ValueListProperty : 'ID'
            },  //local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Name'
            }
        ],
        SearchSupported : true
    };

    orderType @Common.ValueListForValidation : ''  @Common.ValueList : {
        CollectionPath  : 'OrderTypes',
        Label           : '{i18n>Description}',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : orderType_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Name'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'OrderCategory'
            }
        ],
        SearchSupported : true
    };
    
    // awbOrderType @Common.ValueListForValidation : ''  @Common.ValueList : {
    //     CollectionPath  : 'OrderTypes',
    //     Label           : '{i18n>Description}',
    //     Parameters      : [
    //         {
    //             $Type             : 'Common.ValueListParameterInOut',
    //             LocalDataProperty : awbOrderType_ID,
    //             ValueListProperty : 'ID'
    //         }, // local data property is the foreign key
    //         {
    //             $Type             : 'Common.ValueListParameterDisplayOnly',
    //             ValueListProperty : 'Name'
    //         },
    //         {
    //             $Type             : 'Common.ValueListParameterDisplayOnly',
    //             ValueListProperty : 'OrderCategory'
    //         }
    //     ],
    //     SearchSupported : true
    // };
    
    purchaseOrganization @Common.ValueListForValidation : '' 
                         @Common.ValueList : {
        CollectionPath  : 'PurchaseOrganizations',
        Label           : '{i18n>Description}',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : purchaseOrganization_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Name'
            }
        ],
        SearchSupported : true
    };

    controlKey @Common.ValueListForValidation : '' 
                         @Common.ValueList : {
        CollectionPath  : 'ControlKeys',
        Label           : '{i18n>Description}',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : controlKey_ID,
                ValueListProperty : 'ID'
            }, // local data property is the foreign key
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Name'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Application'
            }
        ],
        SearchSupported : true
    };

};

annotate smartDOCService.Carriers with @(
    Common.SemanticKey : [carrier_ID],
    UI                 : {
        HeaderInfo      : {
            TypeName       : '{i18n>Carrier}',
            TypeNamePlural : '{i18n>Carriers}',
            Title          : {
                $Type : 'UI.DataField',
                Value : carrier_ID
            },
            Description    : {
                $Type : 'UI.DataField',
                Value : carrier.name
            }
        },
        Identification  : [{Value : carrier_ID}],
        SelectionFields : [
            carrier_ID,
            companyCode_ID,
            mainWorkCenter_ID,
            orderType_ID,
            plant_ID,
            materialGroup_ID

        ],

        LineItem        : [

            //{Value : ID, },
            {Value : carrier_ID},
            {Value : companyCode_ID },
            {Value : plant_ID, },
            {Value : mainWorkCenter_ID},
            {Value : orderType_ID},
            {Value : materialGroup_ID },
            {Value : purchaseOrganization_ID},
            {Value : controlKey_ID},
        ],
        Facets          : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : 'General',
            Target : '@UI.FieldGroup'
        }, ],
        FieldGroup      : {Data : [

            //{Value : ID, },
            
            {Value : carrier_ID},
            {Value : companyCode_ID },
            {Value : plant_ID, },
            {Value : mainWorkCenter_ID},
            {Value : orderType_ID },
            // {Value : awbOrderType_ID },
            {Value : materialGroup_ID},
            {Value : purchaseOrganization_ID},
            {Value : controlKey_ID},
        ]},
    },
);





/////////////////////////////////////////////////////////////
// Start of Airport Draft UI
/////////////////////////////////////////////////////////////



annotate smartDOCService.Airports {
    airport @Common.ValueListForValidation : '' @Common.ValueList : {
        CollectionPath  : 'TR_Airports',
        Label           : '{i18n>Description}',
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


    plant @Common.ValueListForValidation : '' @Common.ValueList : {
        CollectionPath  : 'Plants',
        Label           : '{i18n>Description}',
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

annotate smartDOCService.Airports with @(
    Common.SemanticKey : [airport_ID],
    UI                 : {
        HeaderInfo      : {
            TypeName       : '{i18n>Airport}',
            TypeNamePlural : '{i18n>Airports}',
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
            Label : '{i18n>AirportDetails}',
            Data  : [
                {Value : airport_ID},
                //{Value : airport.name, Label : 'Airport Name' },
                {Value : plant_ID},
                //{Value : plant.Name, Label : 'Plant Name' },
                {Value : airport.aptcd_icao},
            ]
        },
    },
);

