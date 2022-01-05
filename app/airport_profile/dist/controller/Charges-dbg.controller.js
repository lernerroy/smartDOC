sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "airportprofile/libs/lodash",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, LayoutType, JSONModel, formatters, lodash) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Charges", {
      formatter: formatters,

      onInit: function () {
        var viewModel = new JSONModel({
          title: "",
        });

        this.setModel(viewModel, "detailsViewModel");

        var dataModel = new JSONModel({
          header: {},
        });

        this.setModel(dataModel, "detailsModel");

        this.getRouter()
          .getRoute("Charges")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      _onObjectMatched: function (oEvent) {
        this.getModel("appView").setProperty("/mainTabsVisible", true);
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
        self.showBusyIndicator(true);
        var oModel = this.getModel("detailsModel");
        const sUrl = this.getModel().sServiceUrl + "PurHeader";
        $.get({
          url: `${sUrl}(ID=${id},IsActiveEntity=true)`,
          data: {
            $select:
              "extenalID,documentDate,description,status,validityFrom,validityTo,aribaIndicator",
            $expand: "vendor,carrier,purchaseOrganization,items",
          },
          success: function (data) {
            var header = _.cloneDeep(data);

            header.airportCharges = [];
            header.cargos = [];
            header.engs = [];
            header.caterings = [];

            if (data && data.items) {
              // loop on the items and group them by line of business
              data.items.forEach(function (item) {
                if (item.lineOfBusiness === "airport") {
                  header.airportCharges.push(item);
                } else if (item.lineOfBusiness === "cargo") {
                  header.cargos.push(item);
                }
              });
            }

            header.items = header.airportCharges;

            oModel.setProperty("/header", header);
            self.showBusyIndicator(false);
            var contractText = self.getResourceBundle().getText("contract");
            self
              .getModel("detailsViewModel")
              .setProperty(
                "/title",
                `${contractText} ${data.extenalID} (${data.description})`
              );
          },
          error: function (err) {
            self.showBusyIndicator(false);
          },
        });
      },
      onLobTabSelected: function(oEvent){
          var oModel = this.getModel("detailsModel");
          var oHeader = oModel.getProperty("/header");
          var sSelectedKey = oEvent.getParameter("selectedKey");

          oModel.setProperty("/header/items", oHeader[sSelectedKey]);

      },
      onBrfButtonPressed: function(oEvent){
          var oListItem = oEvent.getSource().getParent();
          var sPath = oListItem.getBindingContextPath();

          // get the item from the model 
          var oItem = this.getModel("detailsModel").getProperty(sPath);
      }
    });
  }
);
