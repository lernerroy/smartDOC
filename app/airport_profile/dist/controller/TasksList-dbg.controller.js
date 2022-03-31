sap.ui.define(
  [
    "./BaseController",
    "sap/f/LayoutType",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController, LayoutType, Device, JSONModel) {
    "use strict";

    return BaseController.extend("airportprofile.controller.TasksList", {
      onInit: function () {
        var tasksListDataModel = new JSONModel({
          items: [],
        });

        this.setModel(tasksListDataModel, "tasksListDataModel");

        this.getRouter()
          .getRoute("TasksList")
          .attachPatternMatched(this._onObjectMatched, this);

        this.getRouter()
          .getRoute("TaskDetails")
          .attachPatternMatched(this._onObjectMatched, this);
      },
      onExit: function () {
        alert("destroy");
      },
      _getDataModel: function () {
        return this.getModel("tasksListDataModel");
      },
      _onObjectMatched: function (oEvent) {
        var routeName = oEvent.getParameter("name");
        var oRouteParams = oEvent.getParameter("arguments");

        this.getModel("appView").setProperty("/mainTabsVisible", true);
        this.getModel("appView").setProperty(
          "/currentSelectedTabKey",
          oRouteParams.type
        );

        this.getModel("appView").setProperty(
          "/currentAirportId",
          oRouteParams.id
        );
        
        if (routeName === "TasksList") {
          this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
          this.getModel("appView").setProperty("/mainTabsVisible", true);

          // set the selected tab according to the type that has been fetched
          // from the route params
          this.getModel("appView").setProperty(
            "/currentSelectedTabKey",
            oRouteParams.type
          );

          this.loadData(oRouteParams.type, oRouteParams.id);
        } else if (routeName === "TaskDetails") {
          if (!this.dataLoaded) {
            this.loadData(oRouteParams.type, oRouteParams.id, oRouteParams.vid);
          } else {
            this._setSelectedListItem(oRouteParams.vid);
          }
        }
      },

      loadData: function (type, airportId, selectedItemId) {
        var sUrl = this.getModel().sServiceUrl + "TaskLists";
        var dataModel = this._getDataModel();
        this.showBusyIndicator(true);
        var self = this;

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
            //   $select:
            //     "extenalID,documentDate,description,status,validFrom,validTo,aribaIndicator",
            //   $expand: "vendor,carrier,purchaseOrganization,items",
          },
          success: function (data) {
            self.dataLoaded = true;
            self.showBusyIndicator(false);
            var items = _.cloneDeep(data.value);
            items.forEach(function (item) {
              item.version = `${moment(item.validFrom).format(
                "MMM Do YY"
              )} - ${moment(item.validTo).format("MMM Do YY")}`;

              item.selected = item.ID === selectedItemId;
              // check if version is current version
              item.isCurrent = moment().isBetween(item.validFrom, item.validTo);
            });
            dataModel.setProperty("/items", items);

            if (type !== "vendor") {
              // auto select current item
              var currentItem = items.find(function (item) {
                return item.isCurrent;
              });

              if (currentItem) {
                self
                  .getRouter()
                  .navTo(
                    "TaskDetails",
                    { id: airportId, vid: currentItem.ID, type: type },
                    false
                  );
              }
            }
          },
          error: function (err) {
            self.showBusyIndicator(false);
          },
        });
      },
      _setSelectedListItem: function (id) {
        var oModel = this._getDataModel();
        var vendors = oModel.getProperty("/items");
        vendors.forEach((item) => {
          item.selected = item.ID === id;
        });

        oModel.refresh();
      },
      onTaskListPressed: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");
        var sPath = oItem.getBindingContextPath();
        var sId = this._getDataModel().getProperty(sPath).ID;
        this._setSelectedListItem(sId);

        var airportId = this.getModel("appView").getProperty(
          "/currentAirportId"
        );

        var type = this.getModel("appView").getProperty(
          "/currentSelectedTabKey"
        );

        this.getRouter().navTo(
          "TaskDetails",
          { id: airportId, vid: sId, type: type },
          false
        );
      },
      onAddAirport: function () {
        this.crossNavigate("airports_configuration", "manage_airports");
      },
    });
  }
);
