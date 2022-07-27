sap.ui.define(
    [
        "./BaseController",
        "sap/f/LayoutType",
        "sap/ui/model/json/JSONModel",
        "../utils/formatters",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/core/Fragment",
        "sap/m/StandardListItem",
        "sap/m/MessageBox",
        "../utils/draftUtils",
        "sap/m/MessagePopover",
        "sap/m/MessagePopoverItem",
        "sap/ui/core/MessageType"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        BaseController,
        LayoutType,
        JSONModel,
        formatters,
        Filter,
        FilterOperator,
        Fragment,
        StandardListItem,
        MessageBox,
        draftUtils,
        MessagePopover,
        MessagePopoverItem,
        MessageType
    ) {
        "use strict";

        return BaseController.extend("airportprofile.controller.Charges", {
            formatter: formatters,

            onInit: function () {
                this._initViewModel();
                this.initializeMessageManager();

                var dataModel = new JSONModel({
                    header: {},
                    headerCopy: null,
                });

                this.setModel(dataModel, "detailsModel");

                var self = this;

                this.getRouter()
                    .getRoute("Charges")
                    .attachPatternMatched(this._onObjectMatched, this);

                this._hashHandler = (function () {
                    var sCurrentHash;

                    var fnHandleHashChange = function (e) {
                        var sOldHash = e.oldURL.substr(e.oldURL.search("#") + 1);
                        var sNewHash = e.newURL.substr(e.newURL.search("#") + 1);

                        if (sCurrentHash !== sOldHash) {
                            return;
                        }

                        // show draft save dialog only when we're in edit mode
                        if (self._getViewModel().getProperty("/editable")) {
                            window.hasher.setHash(sOldHash.substr(1));
                            if (self.formChanged) {
                                self.onCancelCreate(sNewHash);
                            }
                        } else {
                            window.removeEventListener("hashchange", fnHandleHashChange);
                            window.hasher.setHash(sOldHash.substr(1));
                            window.hasher.changed.active = true;
                            window.hasher.setHash(sNewHash.substr(1));
                        }
                    };

                    return {
                        startManualHashChangeHandling: function () {
                            sCurrentHash = window.location.hash.substr(1);
                            window.hasher.changed.active = false;
                            window.addEventListener("hashchange", fnHandleHashChange);
                        },
                        stopManualHashChangeHandling: function () {
                            window.hasher.changed.active = true;
                            window.removeEventListener("hashchange", fnHandleHashChange);
                        },
                    };
                })();
            },
            onDeleteLobItem: function (oEvent) {
                var oContext = oEvent
                    .getSource()
                    .getParent()
                    .getParent()
                    .getBindingContext();

                oContext.delete();
            },
            _deleteLobItem: function (item, fnSuccess, fnError) {
                var sUrl = this.getModel().sServiceUrl;
                sUrl = `${sUrl}PurItems(up__ID=${item.up__ID},IsActiveEntity=${item.IsActiveEntity},ID=${item.ID})`;

                $.ajax({
                    url: sUrl,
                    type: "DELETE",
                    headers: {
                        "Content-Type": "application/json;IEEE754Compatible=true",
                    },
                    success: fnSuccess,
                    error: fnError,
                });
            },
            _initViewModel: function () {
                var data = {
                    vhTitle: "",

                    title: "",
                    editLobDialog: {
                        title: "",
                        busy: false,
                    },
                    modes: {
                        create: false,
                        edit: false,
                        displayWithDraft: false,
                        displayWithoutDraft: false,
                        locked: false,
                    },
                    lobSelectedTab: "airport",

                    editable: false,
                };

                var viewModel = this._getViewModel();
                if (viewModel) {
                    viewModel.setData(data);
                } else {
                    this.setModel(new JSONModel(data), "detailsViewModel");
                }
            },
            _getDataModel: function () {
                return this.getModel("detailsModel");
            },
            _getViewModel: function () {
                return this.getModel("detailsViewModel");
            },
            _getLobSelectedTab: function () {
                return this._getViewModel().getProperty("/lobSelectedTab");
            },
            _onObjectMatched: function (oEvent) {
                // clear data model
                this._getDataModel().setProperty("/header", {});
                this.getModel("appView").setProperty("/mainTabsVisible", true);
                this.routeParams = oEvent.getParameter("arguments");

                this.getModel("appView").setProperty(
                    "/currentAirportId",
                    this.routeParams.id
                );

                this.getEventBus().publish(
                    "route",
                    "charges",
                    oEvent.getParameter("arguments")
                );

                this.getModel("appView").setProperty(
                    "/layout",
                    LayoutType.TwoColumnsMidExpanded
                );

                this.loadData(oEvent.getParameter("arguments").vid);
            },

            loadData: function (id) {
                var self = this;

                var oFilter = [
                    new Filter({
                        path: "ID",
                        operator: FilterOperator.EQ,
                        value1: id,
                    }),
                    new Filter({
                        filters: [
                            new Filter({
                                path: "IsActiveEntity",
                                operator: FilterOperator.EQ,
                                value1: false,
                            }),
                            new Filter({
                                path: "SiblingEntity/IsActiveEntity",
                                operator: FilterOperator.EQ,
                                value1: null,
                            }),
                        ],
                        and: false,
                    }),
                ];
                var oListBinding = this.getModel().bindList(
                    "/PurDocs",
                    null,
                    null,
                    oFilter,
                    null
                );

                oListBinding
                    .requestContexts(0, 2)
                    .then(
                        function (aContexts) {
                            if (aContexts && aContexts.length > 0) {
                                this.oContext = aContexts[0];
                                this.oContextObjectCopy = _.cloneDeep(
                                    this.oContext.getObject()
                                );
                                self.loadContract(aContexts[0]);
                            } else {
                                self._navToVendors();
                            }
                        }.bind(this)
                    )
                    .catch(function (error) { }.bind(this));
            },
            loadContract: function (oContext) {
                var self = this;
                this.getView().bindElement({
                    path: oContext.getPath(),
                    parameters: {
                        $select:
                            "extenalID,documentDate,description,status,validFrom,validTo,aribaIndicator",
                        $expand:
                            "vendor,carrier,purchaseOrganization,status,DraftAdministrativeData",
                    },
                    events: {
                        dataReceived: function (oEvent) {
                            var item = oEvent.getSource().getBoundContext().getObject();
                            self._updateFormMode(item);
                        },
                        change: function () { },
                    },
                });
            },

            _updateFormMode: function (data) {
                var currentUser = "";
                if (sap.ushell) {
                    currentUser = sap.ushell.Container.getUser().getEmail();
                }

                var createMode =
                    data.DraftAdministrativeData &&
                        data.DraftAdministrativeData.DraftIsCreatedByMe &&
                        !data.IsActiveEntity &&
                        !data.HasActiveEntity &&
                        !data.HasDraftEntity
                        ? true
                        : false;

                var editMode =
                    data.DraftAdministrativeData &&
                        data.DraftAdministrativeData.DraftIsCreatedByMe &&
                        !data.IsActiveEntity &&
                        data.HasActiveEntity &&
                        !data.HasDraftEntity
                        ? true
                        : false;

                var displayModeWithDraft =
                    data.DraftAdministrativeData &&
                        !data.DraftAdministrativeData.DraftIsCreatedByMe &&
                        data.IsActiveEntity &&
                        !data.HasActiveEntity &&
                        data.HasDraftEntity
                        ? true
                        : false;

                var displayModeWithoutDraft =
                    !data.DraftAdministrativeData &&
                        data.IsActiveEntity &&
                        !data.HasDraftEntity &&
                        data.HasDraftEntity
                        ? true
                        : false;

                var isLocked =
                    data.IsActiveEntity &&
                        data.HasDraftEntity &&
                        data.DraftAdministrativeData.LastChangedByUser !== currentUser &&
                        data.DraftAdministrativeData.InProcessByUser
                        ? true
                        : false;

                this._getViewModel().setProperty("/modes", {
                    create: createMode,
                    edit: editMode,
                    displayWithDraft: displayModeWithDraft,
                    displayWithoutDraft: displayModeWithoutDraft,
                    locked: isLocked,
                });

                this._getViewModel().setProperty("/editable", createMode || editMode);

                if (createMode || editMode) {
                    this.formChanged = true;
                    this._hashHandler.startManualHashChangeHandling();
                } else {
                    this._hashHandler.stopManualHashChangeHandling();
                }
            },

            onServiceButtonPress: function (oEvent) {
                var oLink = oEvent.getSource();
                var self = this;

                var oItem = oLink.getBindingContext().getObject();

                // create popover
                if (!this._serviceInfoPopover) {
                    this._serviceInfoPopover = Fragment.load({
                        id: self.getView().getId(),
                        name: "airportprofile.fragments.serviceInfo",
                        controller: this
                    }).then(function (oPopover) {
                        self.getView().addDependent(oPopover);
                        oPopover.bindElement(`/ServiceData('${oItem.serviceNumber_ID}')`);
                        return oPopover;
                    });
                }
                this._serviceInfoPopover.then(function (oPopover) {
                    oPopover.attachAfterClose(function () {
                        self._serviceInfoPopover = null;
                    });
                    oPopover.openBy(oLink);
                });

                ;
            },

            onValueHelpRequest: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();

                var lPath = "";
                this.currentValueHelpInputID = oEvent.getSource().data("name");
                switch (oEvent.getSource().data("name")) {
                    case "purchaseOrgInput":
                        lPath = "/PurchaseOrganizations";
                        this._getViewModel().setProperty(
                            "/vhTitle",
                            "Purchase Organizations"
                        );
                        break;
                    case "vendorInput":
                        lPath = "/BusinessPartners";
                        this._getViewModel().setProperty("/vhTitle", "Vendors");
                        break;
                    case "serviceInput":
                        lPath = "/ServiceData";
                        this._getViewModel().setProperty("/vhTitle", "Services");
                        break;
                    default:
                        break;
                }

                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "airportprofile.fragments.ValueHelpDialog",
                        controller: this,
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialog.then(function (oDialog) {
                    // Create a filter for the binding
                    //var sValue = event.getParameter("suggestValue"),

                    oDialog.bindAggregation("items", {
                        path: lPath,
                        filters: [new Filter("ID", FilterOperator.EQ, sInputValue)],
                        template: new StandardListItem({
                            title: "{Name}",
                            description: "{ID}",
                        }),
                    });

                    //oDialog.getBinding("items").filter([new Filter("ID", FilterOperator.EQ, sInputValue)]);

                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onValueHelpDialogSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");

                var oFilter = new Filter("ID", FilterOperator.EQ, sValue);

                oEvent.getSource().getBinding("items").filter([oFilter]);
            },

            onValueHelpDialogClose: function (oEvent) {
                var sDescription,
                    oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);

                if (!oSelectedItem) {
                    return;
                }

                sDescription = oSelectedItem.getDescription();

                this.byId(this.currentValueHelpInputID).setSelectedKey(sDescription);
                this.byId(this.currentValueHelpInputID + "ID").setText(sDescription);
            },

            onPurchaseOrgSuggestionItemSelected: function (oEvent) {
                var oItem = oEvent.getParameter("selectedItem");
                var sSelectedKey = oItem.getKey();
                this.getModel("editedContract").setProperty(
                    "/purchaseOrgId",
                    sSelectedKey
                );
            },

            onVendorSuggestionItemSelected: function (oEvent) {
                var oItem = oEvent.getParameter("selectedItem");
                var sSelectedKey = oItem.getKey();
                this.getModel("editedContract").setProperty("/vendorId", sSelectedKey);
            },

            onServiceSuggestionItemSelected: function (oEvent) {
                var oItem = oEvent.getParameter("selectedItem");
                var sSelectedKey = oItem.getKey();

                this.getModel("editLobData").setProperty(
                    "/serviceNumberId",
                    sSelectedKey
                );
            },

            _navToVendors: function () {
                this._hashHandler.stopManualHashChangeHandling();

                this.onNavBack(
                    "Vendors",
                    {
                        id: this.routeParams.id,
                    },
                    true
                );
            },

            vendorOnSuggest: function (event) {
                var sValue = event.getParameter("suggestValue"),
                    aFilters = [];
                if (sValue) {
                    aFilters = [
                        new Filter(
                            [
                                new Filter("ID", FilterOperator.EQ, sValue),
                                new Filter("Name", FilterOperator.EQ, sValue),
                            ],
                            false
                        ),
                    ];
                }

                event.getSource().getBinding("suggestionItems").filter(aFilters);
                event.getSource().suggest();
            },

            onCancelButtonClicked: function () {
                this.onCancelCreate();
            },

            onCancelCreate: function (sNewHash = null) {
                var self = this;
                draftUtils.handleDraftSaveChanges(this.getResourceBundle(), {
                    onKeepDraft: function () {
                        self._getViewModel().setProperty("/editable", false);
                        if (sNewHash !== null) {
                            window.hasher.setHash(sNewHash.substr(1));
                            this._hashHandler.stopManualHashChangeHandling();
                        } else {
                            self._navToVendors();
                        }
                    },
                    onDiscardDraft: function () {
                        self._deleteContext();
                    },
                    onCancel: function () {
                        self.getEventBus().publish(null, "selectVendorItem", {
                            id: self.oContext.getObject().ID,
                        });
                    },
                });
            },
            onMessagesIndicatorPressed: function (oEvent) {
                var oMessagesButton = oEvent.getSource();

                if (!this._messagePopover) {
                    this._messagePopover = new MessagePopover({
                        items: {
                            path: "message>/",
                            template: new MessagePopoverItem({
                                description: "{message>description}",
                                type: "{message>type}",
                                title: "{message>message}",
                            }),
                        },
                    });
                    oMessagesButton.addDependent(this._messagePopover);
                }

                this._messagePopover.toggle(oMessagesButton);
            },
            onSaveContract: function () {
                var oOperation = this.getModel().bindContext(
                    "smartDOCDraft.draftActivate(...)",
                    this.oContext
                );

                var self = this;

                this.oMessageManager.removeAllMessages();

                oOperation
                    .execute()
                    .then(
                        function (oUpdatedContext) {
                            self.loadData(oUpdatedContext.getObject().ID);
                            self.getEventBus().publish(null, "refreshVendors");
                        }.bind(this)
                    )
                    .catch(function (err) { });
            },
            onLobTabSelected: function (oEvent) {
                var sSelectedKey = oEvent.getParameter("selectedKey");
                var oTable = this.getView().byId("lobsTable");
                var oListBinding = oTable.getBinding("items");
                oListBinding.filter(
                    new Filter({
                        path: "lineOfBusiness",
                        operator: FilterOperator.EQ,
                        value1: sSelectedKey,
                    })
                );
            },
            onBrfButtonPressed: function (oEvent) {
                var oListItem = oEvent.getSource().getParent().getParent();
                var oItem = oListItem.getBindingContext().getObject();

                if (!sap.ushell || !sap.ushell.Container) {
                    return;
                }

                sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(
                    function (xnaservice) {
                        const RESOURCES = {
                            MD_APP_BASE_URL: "BusinessRules-ManageDecision&/RuleServices",
                            REVISIONS: "Revisions",
                        };
                        var sShellHashURL = RESOURCES.MD_APP_BASE_URL + "/" + oItem.brf_id;
                        xnaservice.toExternal({
                            target: {
                                shellHash: sShellHashURL,
                            },
                        });
                    }
                );
            },
            onCarrierChange: function () {

            },
            _setupEditedContractModel: function (data) {
                var editedContractModel = new JSONModel({
                    contractItem: null,
                    statusCode: data.status ? data.status.code : "",
                    description: data.description,
                    docDate: data.documentDate,
                    validFromDate: data.validFrom,
                    validToDate: data.validTo,
                    carrierId: data.carrier_ID,
                    purchaseOrgId: data.purchaseOrganization_ID,
                    purchaseOrgName: data.purchaseOrganization
                        ? "(" +
                        data.purchaseOrganization_ID +
                        ") " +
                        data.purchaseOrganization.Name
                        : "",
                    vendorId: data.vendor_ID,
                    vendorName: data.vendor
                        ? "(" + data.vendor_ID + ") " + data.vendor.Name
                        : "",
                });

                this.contractChanged = false;

                this.getView().setModel(editedContractModel, "editedContract");

                editedContractModel.attachPropertyChange(function () {
                    this.contractChanged = true;
                    var oItem = this.getView().getModel("editedContract").getData();
                    this._saveDraftContract(data.ID, data.IsActiveEntity, oItem);
                }, this);

                return editedContractModel;
            },
            _saveDraftContract: function (contractId, isActiveEntity, contractItem) {
                var sUrl = `${
                    this.getModel().sServiceUrl
                    }PurDocs(ID=${contractId},IsActiveEntity=${isActiveEntity})`;
                var method = "PATCH";
                var oContractItemModel = this.getView().getModel("editedContract");
                var self = this;
                var payload = {
                    validFrom: contractItem.validFromDate
                        ? moment(contractItem.validFromDate, "YYYY-MM-DD HH:mm:ss.SS")
                            .utc(false)
                            .format("yyyy-MM-DDThh:mm:ss.sssZ")
                        : "",
                    validTo: contractItem.validToDate
                        ? moment(contractItem.validToDate, "YYYY-MM-DD HH:mm:ss.SS")
                            .utc(false)
                            .format("yyyy-MM-DDThh:mm:ss.sssZ")
                        : "",
                    objectType: "contract",
                    documentDate: contractItem.docDate,
                    description: contractItem.description,
                    airport_ID: this.routeParams.id,
                    status_code: contractItem.statusCode,
                    carrier_ID: contractItem.carrierId,
                    purchaseOrganization_ID: contractItem.purchaseOrgId,
                    documentType: "airport",
                    vendor_ID: contractItem.vendorId,
                    aribaIndicator: null,
                };

                $.ajax({
                    url: sUrl,
                    type: method,
                    data: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json;IEEE754Compatible=true",
                    },
                    dataType: "json",
                    success: function (data) {
                        oContractItemModel.setProperty("/contractItem", data);
                    },
                    error: function (error) {
                        self.showMessageDialog(
                            self.getResourceBundle().getText("error"),
                            error.responseJSON.error.message
                        );
                    },
                });
            },

            onEditContractPressed: function () {
                var oOperation = this.getModel().bindContext(
                    "smartDOCDraft.draftEdit(...)",
                    this.oContext
                );

                var self = this;

                oOperation
                    .execute()
                    .then(
                        function (oUpdatedContext) {
                            self.loadData(oUpdatedContext.getObject().ID);
                            self.getEventBus().publish(null, "refreshVendors");
                        }.bind(this)
                    )
                    .catch(function (err) {
                        var message = err.message;
                        if (!message && err.responseJSON) {
                            message = err.responseJSON.error.message;
                        }
                        self.showMessageDialog("Error", message);
                    });
            },
            onDeleteContractPressed: function () {
                var oItem = this.oContext.getObject();
                var lv_message = `Delete the object ${oItem.extenalID} (${oItem.description})`;

                var self = this;
                MessageBox.warning(lv_message, {
                    actions: ["Delete", MessageBox.Action.CANCEL],
                    emphasizedAction: "Delete",
                    onClose: function (sAction) {
                        if (sAction === "Delete") {
                            self._deleteContext();
                        }
                    },
                });
            },
            _deleteContext: function () {
                var self = this;
                this.oContext
                    .delete()
                    .then(function () {
                        self.getEventBus().publish(null, "refreshVendors");
                        self._navToVendors();
                    })
                    .catch(function (err) {
                        self.showMessageDialog("Error", err.responseJSON.error.message);
                    });
            },
            onAddLobItem: function () {
                this._getViewModel().setProperty("/editLobDialog/title", "Create Item");

                var oDataListBinding = this.getModel().bindList(
                    "items",
                    this.oContext,
                    null,
                    null,
                    {}
                );

                oDataListBinding.create(
                    {
                        extenalID: "10",
                        status_code: "A",
                        description: undefined,
                        validFrom: moment(new Date(), "YYYY-MM-DD HH:mm:ss.SS"),
                        validTo: moment("9999-12-31", "YYYY-MM-DD HH:mm:ss.SS"),
                        quantity: 1,
                        currency_ID: undefined,
                        lineOfBusiness: this._getLobSelectedTab(),
                        serviceNumber_ID: undefined,
                        price: undefined,
                    },
                    false,
                    false,
                    false
                );

                oDataListBinding.attachCreateCompleted(function (oEvent) {
                    this.getModel().refresh();
                }, this);
            },
        });
    }
);
