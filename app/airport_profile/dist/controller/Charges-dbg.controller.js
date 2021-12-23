sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "airportprofile/libs/lodash"
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
          title: "Contract Details",
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

            delete header.items;

            oModel.setProperty("/header", header);
            self.showBusyIndicator(false);
            self
              .getModel("detailsViewModel")
              .setProperty("/title", `Contract Details ${data.extenalID}`);
          },
          error: function (err) {
            self.showBusyIndicator(false);
          },
        });
      },
    });
  }
);
