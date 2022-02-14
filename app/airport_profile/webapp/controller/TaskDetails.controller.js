sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, LayoutType, JSONModel, formatters, Fragment) {
    "use strict";

    return BaseController.extend("airportprofile.controller.TaskDetails", {
      formatter: formatters,

      onInit: function () {
        var viewModel = new JSONModel({
          title: this.getResourceBundle().getText("airportProfileTitle"),
          selectedTabKey: "airportCharges",
          currentLocationText: "",
          icon: "",
        });

        this.setModel(viewModel, "taskDetailsViewModel");

        var dataModel = new JSONModel({
          airportCharges: [],
          cargoCharges: [],
          items: [],
          versions: [],
        });

        this.setModel(dataModel, "taskDetailsDataModel");

        var servicesDialogModel = new JSONModel({
          busy: false,
          title: "",
          services: [],
        });

        this.setModel(servicesDialogModel, "servicesDialogModel");

        this.getRouter()
          .getRoute("TaskDetails")
          .attachPatternMatched(this._onObjectMatched, this);

        this.getRouter()
          .getRoute("Services")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      navToAirports: function () {
        this.getRouter().navTo("Airports", {}, true);
      },
      _onObjectMatched: function (oEvent) {
        var routeName = oEvent.getParameter("name");
        var oRouteParams = oEvent.getParameter("arguments");
        this.routeParams = oRouteParams;
        this.getModel("appView").setProperty("/mainTabsVisible", true);

        this.getModel("appView").setProperty(
          "/currentSelectedTabKey",
          oRouteParams.type
        );

        var oViewModel = this._getViewModel();
        // set title and breadcrumbs location by selected main tab
        if (oRouteParams.type === "arr") {
          oViewModel.setProperty(
            "/title",
            `${this.getResourceBundle().getText(
              "airportProfileTitle"
            )} - ${this.getResourceBundle().getText("arrival")}`
          );
          oViewModel.setProperty(
            "/currentLocationText",
            this.getResourceBundle().getText("arrival")
          );
        } else {
          oViewModel.setProperty(
            "/title",
            `${this.getResourceBundle().getText(
              "airportProfileTitle"
            )} - ${this.getResourceBundle().getText("departure")}`
          );
          oViewModel.setProperty(
            "/currentLocationText",
            this.getResourceBundle().getText("departure")
          );
        }

        if (routeName === "TaskDetails") {
          this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
          this.loadVersions(oRouteParams.type, oRouteParams.id);
        } else {
          // select selected item
          if (!this.versionsLoaded) {
            this.loadVersions(oRouteParams.type, oRouteParams.id);
            this.itemIdToSelect = oRouteParams.itemid;
          }
        }
      },
      _getViewModel: function () {
        return this.getModel("taskDetailsViewModel");
      },
      _getDataModel: function () {
        return this.getModel("taskDetailsDataModel");
      },
      _getServicesDataModel: function () {
        return this.getModel("servicesDialogModel");
      },
      _clearServicesDataModel: function () {
        var oModel = this._getServicesDataModel();
        oModel.setProperty("/busy", false);
        oModel.setProperty("/services", []);
        oModel.setProperty("/title", "");
      },

      loadVersions: function (type, airportId) {
        var sUrl = this.getModel().sServiceUrl + "TaskLists";
        var dataModel = this._getDataModel();
        var self = this;
        let currentVersionID = null;

        // filter only version relevant to the selected type (arrival/departure)
        var filter = "";

        if (type === "dep") {
          // arrival flights has no origin
          filter = `origin_ID eq '${airportId}'`;
        } else if (type === "arr") {
          // depature flights has no destinatio
          filter = `destination_ID eq '${airportId}'`;
        }
        $.get({
          url: sUrl,
          data: {
            $filter: filter,
            $orderby: "validTo desc",
            "sap-valid-from": "date'1900-01-01'",
          },
          success: function (data) {
            self.versionsLoaded = true;
            // self.showBusyIndicator(false);
            var items = _.cloneDeep(data.value);
            items.forEach(function (item) {
              item.version = `${moment(item.validFrom).format(
                "MMM Do YY"
              )} - ${moment(item.validTo).format("MMM Do YY")}`;

              //   item.selected = item.ID === selectedItemId;
              item.selected = false;
              // check if version is current version
              item.isCurrent = moment().isBetween(item.validFrom, item.validTo);

              if (item.isCurrent) {
                currentVersionID = item.ID;
              }
            });
            dataModel.setProperty("/versions", items);

            // auto select current version
            if (currentVersionID) {
              var oVersionsCombo = self.getView().byId("versionsComboBox");
              if (oVersionsCombo) {
                oVersionsCombo.setSelectedKey(currentVersionID);
              }
              self.loadData(currentVersionID);
            }
          },
          error: function (err) {
            console.log(err);
          },
        });
      },
      onVersionSelectionChanged: function (oEvent) {
        var selectedId = oEvent.getSource().getSelectedKey();
        this.loadData(selectedId);
      },
      /**
       * Load the line of business items
       * @param {*} id
       */
      loadData: function (id) {
        var self = this;
        self.showBusyIndicator(true);
        var oModel = this._getDataModel();
        oModel.setProperty("/items", []);
        const sUrl = `${this.getModel().sServiceUrl}TaskLists`;
        $.get({
          url: `${sUrl}(ID=${id},IsActiveEntity=true)/items`,
          data: {
            $expand: "purDoc,status,domesticIntl,serviceType",
          },
          success: function (data) {
            self.showBusyIndicator(false);
            self._mapDataToModel(data.value);
            self._displayItemsBySelectedTabKey();
            if (self.itemIdToSelect) {
              self._selectItemById(self.itemIdToSelect);
            }
            self.itemIdToSelect = null;
          },
          error: function (err) {
            self.showBusyIndicator(false);
          },
        });
      },
      _deslectAllItems: function () {
        var oModel = this._getDataModel();
        var airportCharges = oModel.getProperty("/airportCharges");

        airportCharges.forEach(function (item) {
          item.selected = false;
        });

        var cargoCharges = oModel.getProperty("/cargoCharges");

        cargoCharges.forEach(function (item) {
          item.selected = false;
        });

        oModel.refresh();
      },
      _selectItemById: function (id) {
        if (!id) {
          return;
        }

        this._deslectAllItems();

        var oModel = this._getDataModel();
        var oViewModel = this._getViewModel();
        var itemToSelect = null;
        var airportCharges = oModel.getProperty("/airportCharges");

        // check if the item id belong to airport charges
        itemToSelect = airportCharges.find(function (item) {
          return item.ID === id;
        });

        if (itemToSelect) {
          itemToSelect.selected = true;
          oModel.refresh();
          oViewModel.setProperty("/selectedTabKey", "airportCharges");
          return;
        }

        var cargoCharges = oModel.getProperty("/cargoCharges");

        // check if the item id belong to airport charges
        itemToSelect = cargoCharges.find(function (item) {
          return item.ID === id;
        });

        if (itemToSelect) {
          itemToSelect.selected = true;
          oModel.refresh();
          oViewModel.setProperty("/selectedTabKey", "cargoCharges");
        }
      },
      // ============== Services Dialog Starts ===============
      /**
       * Lobs table click handler
       * @param {*} oEvent
       */
      onLobItemPressed: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("listItem");
        var sPath = oSelectedItem.getBindingContextPath();
        var oItem = this._getDataModel().getProperty(sPath);

        this.getModel("appView").setProperty(
          "/layout",
          LayoutType.TwoColumnsBeginExpanded
        );

        this._selectItemById(oItem.ID);


        this.getRouter().navTo(
          "Services",
          {
            id: this.routeParams.id,
            type: this.routeParams.type,
            uid: oItem.purDoc_ID,
            itemid: oItem.ID,   
            tid: oItem.up__ID
          },
          false
        );
      },

      onContractIdPressed: function (oEvent) {
        var sPath = oEvent.getSource().getParent().getBindingContextPath();
        var oItem = this._getDataModel().getProperty(sPath);

        var oOpener = oEvent.getSource();
        var self = this;

        if (!this.getModel("contractData")) {
          var oContractDataModel = new JSONModel(oItem.purDoc);
          this.setModel(oContractDataModel, "contractData");
        } else {
          this.getModel("contractData").setData(oItem.purDoc);
          this.getModel("contractData").refresh(true);
        }

        if (!this._contractPopover) {
          this._contractPopover = Fragment.load({
            id: self.getView().getId(),
            name: "airportprofile.fragments.contractPopover",
            controller: this,
          }).then(function (oPopover) {
            self.getView().addDependent(oPopover);
            return oPopover;
          });
        }

        this._contractPopover.then(function (oPopover) {
          oPopover.openBy(oOpener);
        });
      },

      onCloseServicesDialogPressed: function () {
        this.servicesDialog.close();
      },

      _loadLobItemServices: function (oItem) {
        var self = this;
        const sUrl = `${this.getModel().sServiceUrl}TaskListItems`;

        this._getServicesDataModel().setProperty("/busy", true);
        $.get({
          url: `${sUrl}(up__ID=${oItem.up__ID},ID='${oItem.ID}',IsActiveEntity=${oItem.IsActiveEntity})/purItem`,
          data: {
            $expand: `purItem($select=ID,description,brf_id,status,serviceNumber_ID;$expand=up_($expand=items))`,
          },
          success: function (data) {
            // iterrate on results and map the services items to the data model
            if (data && data.value) {
              var services = data.value.map(function (item) {
                return item.purItem;
              });
              self._getServicesDataModel().setProperty("/services", services);
              self._getServicesDataModel().setProperty("/busy", false);
            }
          },
          error: function (err) {
            self._getServicesDataModel().setProperty("/busy", false);
          },
        });
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
        this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
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
