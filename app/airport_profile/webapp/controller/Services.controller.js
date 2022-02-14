sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, LayoutType, JSONModel, formatters) {
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

        this.setModel(servicesDialogModel, "servicesDataModel");

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

        this._loadData(this.routeParams.uid, this.routeParams.itemid, this.routeParams.tid);
      },
      _getDataModel: function () {
        return this.getModel("servicesDataModel");
      },

      _loadData: function (uid, id, tid) {
        var promises = [];

        const activeServicesUrl = `${this.getModel().sServiceUrl}TaskListItems`;

        promises.push();

        const sUrl = `${this.getModel().sServiceUrl}PurDocs`;

        var oDataModel = this._getDataModel();
        oDataModel.setProperty("/busy", true);

        var servicesPromise = $.get({
          url: `${sUrl}(ID=${uid},IsActiveEntity=true)/items`,
          data: {
            $select: "description,status_code,serviceNumber_ID",
            $expand: "status",
          },
        });

        var activeServicesPromises = $.get({
            url: `${activeServicesUrl}(up__ID=${tid},ID='${id}',IsActiveEntity=true)/purItem`
        });

        promises.push(servicesPromise);
        promises.push(activeServicesPromises);

        oDataModel.setProperty("/busy", true);
        Promise.all(promises)
       .then(function([servicesRes, activeServicesRes]){
            var activeServices = activeServicesRes.value;
            var services = servicesRes.value;
            activeServices.forEach(function(activeService){
                var service = services.find(s => s.ID === activeService.purItem_ID);

                if (service){
                    service.isActive = true;
                }                
            });

            oDataModel.setProperty("/services", services);

        }).finally(function(){
            oDataModel.setProperty("/busy", false);
        });

        // $.get({
        //   url: `${sUrl}(ID=${uid},IsActiveEntity=true)/items`,
        //   data: {
        //     $select: "description,status_code,serviceNumber_ID",
        //     $expand: "status",
        //   },
        //   success: function (data) {
        //     // iterrate on results and map the services items to the data model
        //     if (data && data.value) {
        //       var services = data.value;
        //       // var services = data.value.map(function (item) {
        //       //   return item.purItem;
        //       // });
        //       oDataModel.setProperty("/services", services);
        //       oDataModel.setProperty("/busy", false);
        //     }
        //   },
        //   error: function (err) {
        //     oDataModel.setProperty("/busy", false);
        //   },
        // });

        // $.get({
        //   url: `${sUrl}(up__ID=${uid},ID='${id}',IsActiveEntity=true)/purItem`,
        //   data: {
        //     $expand: "purItem($select=ID,description,brf_id,status,serviceNumber_ID;$expand=up_($expand=items))"
        //   },
        //   success: function (data) {
        //     // iterrate on results and map the services items to the data model
        //     if (data && data.value) {
        //       var services = data.value.map(function (item) {
        //         return item.purItem;
        //       });
        //       oDataModel.setProperty("/services", services);
        //       oDataModel.setProperty("/busy", false);
        //     }
        //   },
        //   error: function (err) {
        //     oDataModel.setProperty("/busy", false);
        //   },
        // });
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
