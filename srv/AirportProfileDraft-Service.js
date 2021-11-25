const cds = require("@sap/cds");

/**
 * Implementation for Risk Management service defined in ./risk-service.cds
 */
module.exports = cds.service.impl(async function () {
  const plants = await cds.connect.to("ZGW_LS_FO_PLANT_SRV");
  this.on("READ", "Plants", async (req) => {
    return plants.run(req.query);
  });
  const Airports = await cds.connect.to("TripService");
  this.on("READ", "Airports", async (req) => {
    return Airports.run(req.query);
  });
  const Carriers = await cds.connect.to("TripService");
  this.on("READ", "Carriers", async (req) => {
    return Carriers.run(req.query);
  });
  const CompanyCodes = await cds.connect.to("API_COMPANYCODE_SRV");
  this.on("READ", "CompanyCodes", async (req) => {
    return CompanyCodes.run(req.query);
  });
  const ControlKeys = await cds.connect.to("ZGW_LS_FO_CONTROL_KEY_SRV");
  this.on("READ", "ControlKeys", async (req) => {
    return ControlKeys.run(req.query);
  });
  const OrderTypes = await cds.connect.to("ZGW_LS_FO_ORDER_TYPE_SRV");
  this.on("READ", "OrderTypes", async (req) => {
    return OrderTypes.run(req.query);
  });
    const MaterialGroups = await cds.connect.to("API_PRODUCTGROUP_SRV");
  this.on("READ", "MaterialGroups", async (req) => {
    return MaterialGroups.run(req.query);
  });
    const PurchaseOrgs = await cds.connect.to("ZGW_LS_FO_PURCHASE_ORG_SRV");
  this.on("READ", "PurchaseOrgs", async (req) => {
    return PurchaseOrgs.run(req.query);
  });
    const WorkCenters = await cds.connect.to("ZGW_LS_FO_WORK_CENTER_SRV");
  this.on("READ", "WorkCenters", async (req) => {
    return WorkCenters.run(req.query);
  });
});
