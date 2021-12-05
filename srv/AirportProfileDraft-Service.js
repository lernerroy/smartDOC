const cds = require("@sap/cds");

/**
 * Implementation for Risk Management service defined in ./risk-service.cds
 */
module.exports = cds.service.impl(async function () {


////////////////////////////////////////////////////////////
// Plants
////////////////////////////////////////////////////////////
  const plantsAPI = await cds.connect.to("ZGW_LS_FO_PLANT_SRV");

  // Airports('...')/plants
  this.on("READ", "Plants", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Airports" &&
      (select.from.ref[1] == "plant" || select.from.ref[1].id === "plant")
    ) {
      // Get supplier ID from risk
      const { plant_ID } = await this.run(
        SELECT.one("plant_ID").from("Airports").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.Plants")
        .where("ID = ", plant_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const plant = await plantsAPI.run(cql);

      return plant;
    } else {
      return next();
    }
  });

  // Airports?$expand=plants
  this.on("READ", "Airports", async (req, next) => {
    const expandIndex = req.query.SELECT.columns.findIndex(
      ({ expand, ref }) => expand && ref[0] === "plant"
    );
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "plant_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["plant_ID"] });

    const airports = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(airports).map((airport) => airport.plant_ID);
    const plants = await plantsAPI.run(
      SELECT.from("smartDOCDraft.Plants").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const airport of asArray(airports)) {
      airport.plant = plantsMap[airport.plant_ID];
    }

    return airports;
  });

  this.on("READ", "Plants", async (req) => {
    return plantsAPI.run(req.query);
  });




////////////////////////////////////////////////////////////
// TR_Airports
////////////////////////////////////////////////////////////
  const AirportsAPI = await cds.connect.to("TripService");

  // Airports('...')/TR_Airports
  this.on("READ", "TR_Airports", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Airports" &&
      (select.from.ref[1] == "airport" || select.from.ref[1].id === "airport")
    ) {
      // Get supplier ID from risk
      const { airport_ID } = await this.run(
        SELECT.one("airport_ID").from("Airports").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.TR_Airports")
        .where("ID = ", airport_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const airport = await AirportsAPI.run(cql);

      return airport;
    } else {
      return next();
    }
  });

  // Airports?$expand=TR_Airports
  this.on("READ", "Airports", async (req, next) => {
    const expandIndex = req.query.SELECT.columns.findIndex(
      ({ expand, ref }) => expand && ref[0] === "airport"
    );
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "airport_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["airport_ID"] });

    const airports = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const TR_airportIds = asArray(airports).map((airport) => airport.airport_ID);
    const TR_airports = await AirportsAPI.run(
      SELECT.from("smartDOCDraft.TR_Airports").where({ ID: TR_airportIds })
    );

    // Convert in a map for easier lookup
    const TR_airportsMap = {};
    for (const TR_airport of TR_airports) TR_airportsMap[TR_airport.ID] = TR_airport;

    // Add suppliers to result
    for (const airport of asArray(airports)) {
      airport.airport = TR_airportsMap[airport.airport_ID];
    }

    return airports;
  });



  this.on("READ", "TR_Airports", async (req) => {
    return AirportsAPI.run(req.query);
  });


  const Carriers = await cds.connect.to("TripService");
  this.on("READ", "TR_Carriers", async (req) => {
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
