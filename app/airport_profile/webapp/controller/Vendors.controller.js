sap.ui.define(
  [
    "./BaseController",
    "sap/ui/core/routing/History",
    "sap/f/LayoutType",
    "sap/ui/model/json/JSONModel",
    "../utils/formatters",
    "sap/ui/Device",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    BaseController,
    History,
    LayoutType,
    JSONModel,
    formatters,
    Device
  ) {
    "use strict";

    return BaseController.extend("airportprofile.controller.Vendors", {
      formatter: formatters,
      onInit: function () {
        var viewModel = new JSONModel({
          airportId: "",
        });

        this.setModel(viewModel, "vendorsView");

        this.getRouter()
          .getRoute("Vendors")
          .attachPatternMatched(this._onObjectMatched, this);

        this.getRouter()
          .getRoute("Charges")
          .attachPatternMatched(this._onObjectMatched, this);

        var vendorsModel = new JSONModel({
          vendorContracts: [],
        });

        this.setModel(vendorsModel, "vendorContracts");
      },

      _onObjectMatched: function (oEvent) {
        var routeName = oEvent.getParameter("name");
        var oRouteParams = oEvent.getParameter("arguments");
        var airportId = oEvent.getParameter("arguments").id;
        this.routeParams = oRouteParams;

        this.getModel("appView").setProperty("/currentAirportId", airportId);

        if (routeName === "Vendors") {
          this.getModel("appView").setProperty("/layout", LayoutType.OneColumn);
          this.getModel("appView").setProperty("/mainTabsVisible", true);

          this.getModel("vendorsView").setProperty(
            "/airportId",
            oRouteParams.id
          );

          this.loadData(oRouteParams.id);
        } else if (routeName === "Charges") {
          if (!this.dataLoaded) {
            this.loadData(oRouteParams.id, oRouteParams.vid);
          } else {
            this._setSelectedListItem(oRouteParams.vid);
          }
        }
      },

      navToAirports: function () {
        this.getRouter().navTo("Airports", {}, true);
      },
      onNavBack: function () {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
          history.go(-1);
        } else {
          this.navToAirports();
        }
      },
      _setSelectedListItem: function (id) {
        var oModel = this.getModel("vendorContracts");
        var vendors = oModel.getProperty("/vendorContracts");
        vendors.forEach((vendor) => {
          vendor.contracts.forEach((item) => {
            item.selected = item.ID === id;
          });
        });

        oModel.refresh();
      },
      loadData: function (airportId, contractId) {
        var currentUser = "";
        if (sap.ushell) {
          currentUser = sap.ushell.Container.getUser().getEmail();
        }
        // console.log(sap.ushell.Container.getService("UserInfo").getId());
        var oModel = this.getModel("vendorContracts");
        var self = this;
        const sUrl = this.getModel().sServiceUrl + "PurDocs?sap-valid-from=date'0001-01-01'";
        $.get({
          url: sUrl,
          data: {
            $filter: `airport_ID eq '${airportId}' and (IsActiveEntity eq false or SiblingEntity/IsActiveEntity eq null)`,
            $expand: "status,DraftAdministrativeData",
          },
          success: function (data) {
            self.dataLoaded = true;
            var vendors = [];
            data.value.forEach(function (item) {
              item.selected = item.ID === contractId;
              item.inProcessByMe =
                item.DraftAdministrativeData &&
                item.DraftAdministrativeData.InProcessByUser === currentUser;

              item.showDraftIndicator =
                (!item.IsActiveEntity && !item.HasDraftEntity) ||
                (item.IsActiveEntity &&
                  item.HasDraftEntity &&
                  item.DraftAdministrativeData.LastChangedByUser ===
                    currentUser);

              item.showUnsavedChangesIndicator =
                item.IsActiveEntity &&
                item.HasDraftEntity &&
                item.DraftAdministrativeData.LastChangedByUser !== currentUser;

              if (item.showUnsavedChangesIndicator) {
                item.draftLastChangedByText = `${this.getResourceBundle().getText(
                  "unsavedChangesBy"
                )} ${item.DraftAdministrativeData.LastChangedByUser}`;
              }

              item.showLockedIndicator =
                item.IsActiveEntity &&
                item.HasDraftEntity &&
                item.DraftAdministrativeData.LastChangedByUser !==
                  currentUser &&
                item.DraftAdministrativeData.InProcessByUser;

              if (item.showLockedIndicator) {
                item.lockedText = `${this.getResourceBundle().getText(
                  "lockedBy"
                )} ${item.DraftAdministrativeData.LastChangedByUser}`;
              }

              // check if vendor id already exists
              var vendor = vendors.find((v) => v.vendor_ID === item.vendor_ID);
              if (vendor) {
                vendor.contracts.push(item);
              } else {
                vendors.push({
                  vendor_ID: item.vendor_ID,
                  contracts: [item],
                });
              }
            });

            oModel.setProperty("/vendorContracts", vendors);
          },
        });
      },
      onContractItemClicked: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");
        var sPath = oItem.getBindingContextPath();
        var sId = this.getModel("vendorContracts").getProperty(sPath).ID;
        this._setSelectedListItem(sId);
        var sAirportId = this.getModel("vendorsView").getProperty("/airportId");
        var bReplace = !Device.system.phone;
        this.getRouter().navTo("Charges", { id: sAirportId, vid: sId }, false);
      },
      onNewContractButtonPressed: function () {
        var sUrl = this.getModel().sServiceUrl + "PurDocs";

        var self = this;

        var payload = {
          validFrom: "1900-01-01T00:00:00.000Z",
          validTo: "9999-12-31T00:00:00.000Z",
          airport_ID: self.routeParams.id ,
          status_code: "A",
          documentDate: new Date().toISOString().split('T')[0],
          
        };

        this.showBusyIndicator(true);

        var self = this;

        $.ajax({
          url: sUrl,
          type: "POST",
          data: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json;IEEE754Compatible=true",
          },
          dataType: "json",
          success: function (data) {
            self.showBusyIndicator(false);
            setTimeout(function () {
              self
                .getRouter()
                .navTo(
                  "Charges",
                  { id: self.routeParams.id, vid: data.ID },
                  false
                );
            }, 10);
          },
          error: function (error) {
            self.showBusyIndicator(false);
          },
        });
      },
    });
  }
);
