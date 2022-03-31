sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
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
    Fragment
  ) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Services", {
      formatter: formatters,

      onInit: function () {
        var servicesDialogModel = new JSONModel({
          busy: false,
          title: "",
          services: [],
          activeServicesIds: [],
        });

        this.setModel(servicesDialogModel, "servicesDialogModel");

        this.getRouter()
          .getRoute("Services")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (oEvent) {
        this.getModel("appView").setProperty("/mainTabsVisible", true);
        this.getModel("appView").setProperty(
          "/layout",
          LayoutType.TwoColumnsBeginExpanded
        );

        this.routeParams = oEvent.getParameter("arguments");
        this._loadContext();
        this._loadContract();
      },
      _loadContext() {
        var self = this;

        var oFilter = [
          new Filter({
            path: "ID",
            operator: FilterOperator.EQ,
            value1: this.routeParams.lobItemId,
          }),
          new Filter({
            path: "up__ID",
            operator: FilterOperator.EQ,
            value1: this.routeParams.taskId,
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
          "/TaskListItems",
          null,
          null,
          oFilter,
          null
        );

        oListBinding
          .requestContexts(0, 1)
          .then(
            function (aContexts) {
              if (aContexts && aContexts.length > 0) {
                self.oContext = aContexts[0];
                self.getView().bindElement({
                  path: self.oContext.getPath(),
                });
              } else {
                // TODO: nav back ?
              }
            }.bind(this)
          )
          .catch(function (error) {}.bind(this));
      },
      _loadContract: function () {
        var oFilter = new Filter({
          path: "ID",
          operator: FilterOperator.EQ,
          value1: this.routeParams.contractId,
        });

        var oListBinding = this.getModel().bindList(
          "/PurDocs",
          null,
          null,
          oFilter,
          null
        );

        var self = this;
        oListBinding
          .requestContexts(0, 1)
          .then(
            function (aContexts) {
              if (aContexts && aContexts.length > 0) {
                self.oContractContext = aContexts[0];
              } else {
                // TODO: nav back ?
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log("error", error);
            }.bind(this)
          );
      },
      onCloseServicesDialog: function (oEvent) {
        oEvent.getSource().getParent().close();
      },
      onAddSelectedServices: function (oEvent) {
        var oTable = this.getView().byId("servicesTable");
        var oDialog = oEvent.getSource().getParent();
        var oSelectedItems = oTable.getSelectedItems();

        if (!oSelectedItems || oSelectedItems.length === 0){
            oDialog.close();
            return;
        }

        var oDataListBinding = this.getModel().bindList(
          "/Pur2TL",
          null,
          null,
          null,
          {}
        );

        var oContextObject = this.oContext.getObject();

        oDialog.setBusy(true);

        for (let oSelectedItem of oSelectedItems) {
          var oItem = oSelectedItem.getBindingContext().getObject();
          oDataListBinding.create(
            {
              taskListItem_up__ID: oContextObject.up__ID,
              taskListItem_ID: oContextObject.ID,
              purItem_ID: oItem.ID,
              purItem_up__ID: oItem.up__ID,
            },
            false,
            false,
            false
          );
        }

        oDataListBinding.attachCreateCompleted(function (oEvent) {
          oDialog.setBusy(false);
          oDialog.close();
          this.getView().bindElement({
            path: this.oContext.getPath(),
          });
        }, this);
      },
      servicesTableSelectionChanged: function (oEvent) {},
      onAddService: function () {
        var self = this;
        Fragment.load({
          id: self.getView().getId(),
          name: "airportprofile.fragments.servicesDialog",
          controller: this,
        }).then(function (oDialog) {
          self._servicesDialog = oDialog;
          self.getView().addDependent(oDialog);
          oDialog.open();
          oDialog.attachAfterClose(
            null,
            function (oEvent) {
              oEvent.getSource().destroy();
            },
            self
          );
          oDialog.bindElement({
            path: self.oContractContext.getPath(),
          });

          oDialog.attachAfterOpen(
            null,
            function () {
              var oTable = this.getView().byId("servicesTable");
              var oDataListBinding = oTable.getBinding("items");
              oDataListBinding.filter(this._getActiveServicesIdsFilter());
              this.getModel("servicesDialogModel").setProperty("/busy", true);
              oTable.attachUpdateFinished(
                null,
                function () {
                  this.getModel("servicesDialogModel").setProperty(
                    "/busy",
                    false
                  );
                },
                this
              );
            },
            self
          );
        });
      },
      _getActiveServicesIdsFilter: function () {
        var aFilters = [];
        var oActiveServicesTable = this.getView().byId("activeServicesTable");
        var oActiveServicesItems = oActiveServicesTable
          .getBindingContext()
          .getObject();
        if (oActiveServicesItems && oActiveServicesItems.purItem) {
          var activeServicesIds = oActiveServicesItems.purItem.map(function (
            i
          ) {
            return i.purItem_ID;
          });

          activeServicesIds.forEach(function (id) {
            aFilters.push(
              new Filter({
                path: "ID",
                operator: FilterOperator.NE,
                value1: id,
              })
            );
          });
        }

        return new Filter({
          filters: aFilters,
          and: true,
        });
      },
      _loadData: function (uid, id, tid) {
        // var promises = [];
        // const activeServicesUrl = `${this.getModel().sServiceUrl}TaskListItems`;
        // promises.push();
        // const sUrl = `${this.getModel().sServiceUrl}PurDocs`;
        // var oDataModel = this._getDataModel();
        // oDataModel.setProperty("/busy", true);
        // var servicesPromise = $.get({
        //   url: `${sUrl}(ID=${uid},IsActiveEntity=true)/items`,
        //   data: {
        //     $select: "description,status_code,serviceNumber_ID",
        //     $expand: "status",
        //   },
        // });
        // var activeServicesPromises = $.get({
        //   url: `${activeServicesUrl}(up__ID=${tid},ID='${id}',IsActiveEntity=true)/purItem`,
        // });
        // promises.push(servicesPromise);
        // promises.push(activeServicesPromises);
        // oDataModel.setProperty("/busy", true);
        // Promise.all(promises)
        //   .then(function ([servicesRes, activeServicesRes]) {
        //     var activeServices = activeServicesRes.value;
        //     var services = servicesRes.value;
        //     activeServices.forEach(function (activeService) {
        //       var service = services.find(
        //         (s) => s.ID === activeService.purItem_ID
        //       );
        //       if (service) {
        //         service.isActive = true;
        //       }
        //     });
        //     oDataModel.setProperty("/services", services);
        //   })
        //   .finally(function () {
        //     oDataModel.setProperty("/busy", false);
        //   });
      },

      // ============== Services Dialog Ends ===============

      _mapDataToModel(items) {
        var oModel = this._getDataModel();

        var _items = items.map(function (item) {
          item.effectiveDate = `${moment(item.validFrom).format(
            "MMM Do YY"
          )} - ${moment(item.validTo).format("MMM Do YY")}`;

          return item;
        });

        // loop on items and map results based on  lineOfBusiness value
        var airportCharges = _items.filter(function (item) {
          return item.lineOfBusiness === "airport";
        });

        var cargoCharges = _items.filter(function (item) {
          return item.lineOfBusiness === "cargo";
        });

        oModel.setProperty("/airportCharges", airportCharges);
        oModel.setProperty("/cargoCharges", cargoCharges);
      },
      _displayItemsBySelectedTabKey: function () {
        var oModel = this._getDataModel();
        var selectedKey = this.getModel("taskDetailsViewModel").getProperty(
          "/selectedTabKey"
        );

        switch (selectedKey) {
          case "airportCharges":
            oModel.setProperty("/items", oModel.getProperty("/airportCharges"));
            break;
          case "cargoCharges":
            oModel.setProperty("/items", oModel.getProperty("/cargoCharges"));
            break;
        }
      },
      onLobTabSelected: function () {
        this._displayItemsBySelectedTabKey();
      },
      onBrfButtonPressed: function (oEvent) {
        var oListItem = oEvent.getSource().getParent();
        var sPath = oListItem.getBindingContextPath();

        // get the item from the model
        var oItem = this.getModel("detailsModel").getProperty(sPath);
      },
      onServicesButtonPressed: function (oEvent) {
        var sPath = oEvent.getSource().getParent().getBindingContextPath();
        var oItem = this._getDataModel().getProperty(sPath);
      },
    });
  }
);
