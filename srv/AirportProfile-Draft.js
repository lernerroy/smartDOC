const cds = require("@sap/cds");

/**
 * Implementation for Risk Management service defined in ./risk-service.cds
 */
module.exports = cds.service.impl(async function () {
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
        SELECT.one("airport_ID")
          .from("Airports")
          .where(select.from.ref[0].where)
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
    // const expandIndex = req.query.SELECT.columns?.findIndex(
    //   ({ expand, ref }) => expand && ref[0] === "airport"
    // )??-1;

    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "airport"
    )??-1;
    

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
    const TR_airportIds = asArray(airports).map(
      (airport) => airport.airport_ID
    );
    const TR_airports = await AirportsAPI.run(
      SELECT.from("smartDOCDraft.TR_Airports").where({ ID: TR_airportIds })
    );

    // Convert in a map for easier lookup
    const TR_airportsMap = {};
    for (const TR_airport of TR_airports)
      TR_airportsMap[TR_airport.ID] = TR_airport;

    // Add suppliers to result
    for (const airport of asArray(airports)) {
      airport.airport = TR_airportsMap[airport.airport_ID];
    }

    return airports;
  });

  this.on("READ", "TR_Airports", async (req) => {
    return AirportsAPI.run(req.query);
  });

  ////////////////////////////////////////////////////////////
  // TR_Carriers
  ////////////////////////////////////////////////////////////
  const CarriersAPI = await cds.connect.to("TripService");

  // Carriers('...')/TR_Carriers
  this.on("READ", "TR_Carriers", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "carrier" || select.from.ref[1].id === "carrier")
    ) {
      // Get supplier ID from risk
      const { carrier_ID } = await this.run(
        SELECT.one("carrier_ID")
          .from("Carriers")
          .where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.TR_Carriers")
        .where("ID = ", carrier_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const carrier = await CarriersAPI.run(cql);

      return carrier;
    } else {
      return next();
    }
  });

  // Carriers?$expand=TR_Carriers
  this.on("READ", "Carriers", async (req, next) => {

    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "carrier"
    )??-1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "carrier_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["carrier_ID"] });

    const carriers = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const TR_carrierIds = asArray(carriers).map(
      (carrier) => carrier.carrier_ID
    );
    const TR_carriers = await CarriersAPI.run(
      SELECT.from("smartDOCDraft.TR_Carriers").where({ ID: TR_carrierIds })
    );

    // Convert in a map for easier lookup
    const TR_carriersMap = {};
    for (const TR_carrier of TR_carriers)
      TR_carriersMap[TR_carrier.ID] = TR_carrier;

    // Add suppliers to result
    for (const carrier of asArray(carriers)) {
      carrier.carrier = TR_carriersMap[carrier.carrier_ID];
    }

    return carriers;
  });

  //const Carriers = await cds.connect.to("TripService");
  this.on("READ", "TR_Carriers", async (req) => {
    return CarriersAPI.run(req.query);
  });

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
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "plant"
    )??-1;
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

  
  // Carriers('...')/plants
  this.on("READ", "Plants", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "plant" || select.from.ref[1].id === "plant")
    ) {
      // Get supplier ID from risk
      const { plant_ID } = await this.run(
        SELECT.one("plant_ID").from("Carriers").where(select.from.ref[0].where)
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

  // Carriers?$expand=plants
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "plant"
    )??-1;
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

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.plant_ID);
    const plants = await plantsAPI.run(
      SELECT.from("smartDOCDraft.Plants").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.plant = plantsMap[FromEntity.plant_ID];
    }

    return FromEntity_s;
  });

  this.on("READ", "Plants", async (req) => {
    return plantsAPI.run(req.query);
  });

  








  ////////////////////////////////////////////////////////////
  // Company Codes
  ////////////////////////////////////////////////////////////
  const CompanyCodesAPI = await cds.connect.to("API_COMPANYCODE_SRV");

  // Carriers('...')/companyCodes
  this.on("READ", "CompanyCodes", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "companyCode" || select.from.ref[1].id === "companyCode")
    ) {
      // Get supplier ID from risk
      const { companyCode_ID } = await this.run(
        SELECT.one("companyCode_ID").from("Carriers").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.CompanyCodes")
        .where("ID = ", companyCode_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const plant = await CompanyCodesAPI.run(cql);

      return plant;
    } else {
      return next();
    }
  });
  
  // Carriers?$expand=companyCodes
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "companyCode"
    )??-1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "companyCode_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["companyCode_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.companyCode_ID);
    const plants = await CompanyCodesAPI.run(
      SELECT.from("smartDOCDraft.CompanyCodes").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.companyCode = plantsMap[FromEntity.companyCode_ID];
    }

    return FromEntity_s;
  });

  this.on("READ", "CompanyCodes", async (req) => {
    return CompanyCodesAPI.run(req.query);
  });










  ////////////////////////////////////////////////////////////
  // Control Keys
  ////////////////////////////////////////////////////////////
  const ControlKeysAPI = await cds.connect.to("ZGW_LS_FO_CONTROL_KEY_SRV");

  // Carriers('...')/controlKeys
  this.on("READ", "ControlKeys", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "controlKey" || select.from.ref[1].id === "controlKey")
    ) {
      // Get supplier ID from risk
      const { controlKey_ID } = await this.run(
        SELECT.one("controlKey_ID").from("Carriers").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.ControlKeys")
        .where("ID = ", controlKey_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const plant = await ControlKeysAPI.run(cql);

      return plant;
    } else {
      return next();
    }
  });
  
  // Carriers?$expand=controlKeys
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "controlKey"
    )??-1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "controlKey_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["controlKey_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.controlKey_ID);
    const plants = await ControlKeysAPI.run(
      SELECT.from("smartDOCDraft.ControlKeys").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.controlKey = plantsMap[FromEntity.controlKey_ID];
    }

    return FromEntity_s;
  });

  
  this.on("READ", "ControlKeys", async (req) => {
    return ControlKeysAPI.run(req.query);
  });




  ////////////////////////////////////////////////////////////
  // Order Types
  ////////////////////////////////////////////////////////////
  const OrderTypesAPI = await cds.connect.to("ZGW_LS_FO_ORDER_TYPE_SRV");

  // Carriers('...')/orderTypes
  this.on("READ", "OrderTypes", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "orderType" || select.from.ref[1].id === "orderType")
    ) {
      // Get supplier ID from risk
      const { orderType_ID } = await this.run(
        SELECT.one("orderType_ID").from("Carriers").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.OrderTypes")
        .where("ID = ", orderType_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const plant = await OrderTypesAPI.run(cql);

      return plant;
    } else {
      return next();
    }
  });
  
  // Carriers?$expand=orderTypes
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "orderType"
    )??-1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "orderType_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["orderType_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.orderType_ID);
    const plants = await OrderTypesAPI.run(
      SELECT.from("smartDOCDraft.OrderTypes").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.orderType = plantsMap[FromEntity.orderType_ID];
    }

    return FromEntity_s;
  });

  this.on("READ", "OrderTypes", async (req) => {
    return OrderTypesAPI.run(req.query);
  });



  
  ////////////////////////////////////////////////////////////
  // Material Groups
  ////////////////////////////////////////////////////////////
  const MaterialGroupsAPI = await cds.connect.to("API_PRODUCTGROUP_SRV");

  // Carriers('...')/materialGroups
  this.on("READ", "MaterialGroups", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "materialGroup" || select.from.ref[1].id === "materialGroup")
    ) {
      // Get supplier ID from risk
      const { materialGroup_ID } = await this.run(
        SELECT.one("materialGroup_ID").from("Carriers").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.MaterialGroups")
        .where("ID = ", materialGroup_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const plant = await MaterialGroupsAPI.run(cql);

      return plant;
    } else {
      return next();
    }
  });
  
  // Carriers?$expand=materialGroups
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "materialGroup"
    )??-1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "materialGroup_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["materialGroup_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.materialGroup_ID);
    const plants = await MaterialGroupsAPI.run(
      SELECT.from("smartDOCDraft.MaterialGroups").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.materialGroup = plantsMap[FromEntity.materialGroup_ID];
    }

    return FromEntity_s;
  });

  
  this.on("READ", "MaterialGroups", async (req) => {
    return MaterialGroupsAPI.run(req.query);
  });





  
  ////////////////////////////////////////////////////////////
  // Purchase Orgs 
  ////////////////////////////////////////////////////////////
  const PurchaseOrganizationsAPI = await cds.connect.to("ZGW_LS_FO_PURCHASE_ORG_SRV");

  // Carriers('...')/purchaseOrganizations
  this.on("READ", "PurchaseOrganizations", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "purchaseOrganization" || select.from.ref[1].id === "purchaseOrganization")
    ) {
      // Get supplier ID from risk
      const { purchaseOrganization_ID } = await this.run(
        SELECT.one("purchaseOrganization_ID").from("Carriers").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.PurchaseOrganizations")
        .where("ID = ", purchaseOrganization_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const plant = await PurchaseOrganizationsAPI.run(cql);

      return plant;
    } else {
      return next();
    }
  });
  
  // Carriers?$expand=purchaseOrganizations
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "purchaseOrganization"
    )??-1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "purchaseOrganization_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["purchaseOrganization_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.purchaseOrganization_ID);
    const plants = await PurchaseOrganizationsAPI.run(
      SELECT.from("smartDOCDraft.PurchaseOrganizations").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.purchaseOrganization = plantsMap[FromEntity.purchaseOrganization_ID];
    }

    return FromEntity_s;
  });

  
  
  this.on("READ", "PurchaseOrganizations", async (req) => {
    return PurchaseOrganizationsAPI.run(req.query);
  });




  
  
  ////////////////////////////////////////////////////////////
  // Work Centers
  ////////////////////////////////////////////////////////////
  const WorkCentersAPI = await cds.connect.to("ZGW_LS_FO_WORK_CENTER_SRV");

  // Carriers('...')/workCenters
  this.on("READ", "WorkCenters", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "mainWorkCenter" || select.from.ref[1].id === "mainWorkCenter")
    ) {
      // Get supplier ID from risk
      const { mainWorkCenter_ID } = await this.run(
        SELECT.one("mainWorkCenter_ID").from("Carriers").where(select.from.ref[0].where)
      );

      // Select all risks for a supplier
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.WorkCenters")
        .where("ID = ", mainWorkCenter_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const plant = await WorkCentersAPI.run(cql);

      return plant;
    } else {
      return next();
    }
  });
  
  // Carriers?$expand=workCenters
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex = req.query.SELECT.columns?.findIndex(
      ({ expand, ref }) => expand && ref[0] === "mainWorkCenter"
    )??-1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure supplier_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "mainWorkCenter_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["mainWorkCenter_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated suppliers
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.mainWorkCenter_ID);
    const plants = await WorkCentersAPI.run(
      SELECT.from("smartDOCDraft.WorkCenters").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add suppliers to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.mainWorkCenter = plantsMap[FromEntity.mainWorkCenter_ID];
    }

    return FromEntity_s;
  });

  
  
  this.on("READ", "WorkCenters", async (req) => {
    return WorkCentersAPI.run(req.query);
  });
});
