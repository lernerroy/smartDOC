const cds = require("@sap/cds");

const SequenceHelper = require("./lib/SequenceHelper.js");

// module.exports = cds.service.impl(async (service) => {
//   const db = await cds.connect.to("db");
//   const { PurDoc } = service.entities;

//   service.before("CREATE", PurDoc, async (context) => {
//     const PurDocId = new SequenceHelper({
//       db: db,
//       sequence: "CONTRACT_ID",
//       table: "PurDocs",
//       field: "extenalID",
//     });

//     context.data.ID = await PurDocId.getNextNumber();
//   });
// });

// module.exports = cds.service.impl(async (service) => {
//   const db = await cds.connect.to("db");
//   const { TaskLists } = service.entities;

//   service.before("CREATE", TaskLists, async (context) => {
//     const TaskListsId = new SequenceHelper({
//       db: db,
//       sequence: "TL_ID",
//       table: "TaskLists",
//       field: "extenalID",
//     });

//     context.data.ID = await TaskListsId.getNextNumber();
//   });
// });

/**
 * Implementation for Airport Profile service in ./AirportProfile-Draft.cds
 */

module.exports = cds.service.impl(async function () {
  this.after("CREATE", "PurDocs", async (req, next) => {
    const db = await cds.connect.to("db");

    const TaskListsId = new SequenceHelper({
      db: db,
      sequence: "CONTRACT_ID",
      table: "PurDocs",
      field: "extenalID",
    });

    req.extenalID = await TaskListsId.getNextNumber();

    return req;
  });

  this.after("CREATE", "TaskLists", async (req, next) => {
    const db = await cds.connect.to("db");

    const TaskListsId = new SequenceHelper({
      db: db,
      sequence: "TL_ID",
      table: "TaskLists",
      field: "extenalID",
    });

    req.extenalID = await TaskListsId.getNextNumber();
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
      // Get object ID from sDOC
      const { airport_ID } = await this.run(
        SELECT.one("airport_ID")
          .from("Airports")
          .where(select.from.ref[0].where)
      );

      // Select all sDOC for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "airport"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "airport_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["airport_ID"] });

    const airports = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
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

    // Add objects to result
    for (const airport of asArray(airports)) {
      airport.airport = TR_airportsMap[airport.airport_ID];
    }

    return airports;
  });

  // PurDocs('...')/TR_Airports
  this.on("READ", "TR_Airports", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.PurDocs" &&
      (select.from.ref[1] == "airport" || select.from.ref[1].id === "airport")
    ) {
      // Get object ID from sDOC
      const { airport_ID } = await this.run(
        SELECT.one("airport_ID").from("PurDocs").where(select.from.ref[0].where)
      );

      // Select all sDOC for a object
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

  // PurDocs?$expand=TR_Airports
  this.on("READ", "PurDocs", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "airport"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "airport_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["airport_ID"] });

    const airports = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
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

    // Add objects to result
    for (const airport of asArray(airports)) {
      airport.airport = TR_airportsMap[airport.airport_ID];
    }

    return airports;
  });

  // TaskLists('...')/TR_Airports
  this.on("READ", "TR_Airports", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.TaskLists" &&
      (select.from.ref[1] == "origin" || select.from.ref[1].id === "origin")
    ) {
      // Get object ID from sDOC
      const { origin_ID } = await this.run(
        SELECT.one("origin_ID")
          .from("TaskLists")
          .where(select.from.ref[0].where)
      );

      if (origin_ID == null || origin_ID === null) {
        return origin_ID;
      } else {
        // Select all sDOC for a object
        const cql = SELECT(select.columns)
          .from("smartDOCDraft.TR_Airports")
          .where("ID = ", origin_ID)
          .limit(select.limit?.rows?.val, select.limit?.offset?.val);
        cql.SELECT.count = !!select.count;
        const airport = await AirportsAPI.run(cql);

        return airport;
      }
    } else {
      return next();
    }
  });

  // TaskLists?$expand=TR_Airports
  this.on("READ", "TaskLists", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "origin"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "origin_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["origin_ID"] });

    const airports1 = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const TR_airportIds = asArray(airports1).map(
      (airport) => airport.origin_ID
    );
    const TR_airports1 = await AirportsAPI.run(
      SELECT.from("smartDOCDraft.TR_Airports").where({ ID: TR_airportIds })
    );

    // Convert in a map for easier lookup
    const TR_airportsMap1 = {};
    for (const TR_airport of TR_airports1)
      TR_airportsMap1[TR_airport.ID] = TR_airport;

    // Add objects to result
    for (const airport of asArray(airports1)) {
      airport.origin = TR_airportsMap1[airport.origin_ID];
    }

    return airports1;
  });

  // TaskLists('...')/TR_Airports
  this.on("READ", "TR_Airports", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.TaskLists" &&
      (select.from.ref[1] == "destination" ||
        select.from.ref[1].id === "destination")
    ) {
      // Get object ID from sDOC
      const { destination_ID } = await this.run(
        SELECT.one("destination_ID")
          .from("TaskLists")
          .where(select.from.ref[0].where)
      );

      if (destination_ID == null || destination_ID === null) {
        return destination_ID;
      } else {
        // Select all sDOC for a object
        const cql = SELECT(select.columns)
          .from("smartDOCDraft.TR_Airports")
          .where("ID = ", destination_ID)
          .limit(select.limit?.rows?.val, select.limit?.offset?.val);
        cql.SELECT.count = !!select.count;
        const airport = await AirportsAPI.run(cql);

        return airport;
      }
    } else {
      return next();
    }
  });

  // TaskLists?$expand=TR_Airports
  this.on("READ", "TaskLists", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "destination"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "destination_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["destination_ID"] });

    const airports = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const TR_airportIds = asArray(airports).map(
      (airport) => airport.destination_ID
    );
    const TR_airports = await AirportsAPI.run(
      SELECT.from("smartDOCDraft.TR_Airports").where({ ID: TR_airportIds })
    );

    // Convert in a map for easier lookup
    const TR_airportsMap = {};
    for (const TR_airport of TR_airports)
      TR_airportsMap[TR_airport.ID] = TR_airport;

    // Add objects to result
    for (const airport of asArray(airports)) {
      airport.destination = TR_airportsMap[airport.destination_ID];
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
      // Get object ID from sDOC
      const { carrier_ID } = await this.run(
        SELECT.one("carrier_ID")
          .from("Carriers")
          .where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "carrier"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "carrier_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["carrier_ID"] });

    const carriers = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
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

    // Add objects to result
    for (const carrier of asArray(carriers)) {
      carrier.carrier = TR_carriersMap[carrier.carrier_ID];
    }

    return carriers;
  });

  // PurDocs('...')/TR_Carriers
  this.on("READ", "TR_Carriers", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.PurDocs" &&
      (select.from.ref[1] == "carrier" || select.from.ref[1].id === "carrier")
    ) {
      // Get object ID from sDOC
      const { carrier_ID } = await this.run(
        SELECT.one("carrier_ID").from("PurDocs").where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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

  // PurDocs?$expand=TR_Carriers
  this.on("READ", "PurDocs", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "carrier"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "carrier_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["carrier_ID"] });

    const carriers = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
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

    // Add objects to result
    for (const carrier of asArray(carriers)) {
      carrier.carrier = TR_carriersMap[carrier.carrier_ID];
    }

    return carriers;
  });

  //   // PurItems('...')/TR_Carriers
  //   this.on("READ", "TR_Carriers", async (req, next) => {
  //     const select = req.query.SELECT;

  //     if (
  //       select.from.ref.length === 2 &&
  //       select.from.ref[0].id === "smartDOCDraft.PurItems" &&
  //       (select.from.ref[1] == "carrier" || select.from.ref[1].id === "carrier")
  //     ) {
  //       // Get object ID from sDOC
  //       const { carrier_ID } = await this.run(
  //         SELECT.one("carrier_ID")
  //           .from("PurItems")
  //           .where(select.from.ref[0].where)
  //       );

  //       // Select all sDOCs for a object
  //       const cql = SELECT(select.columns)
  //         .from("smartDOCDraft.TR_Carriers")
  //         .where("ID = ", carrier_ID)
  //         .limit(select.limit?.rows?.val, select.limit?.offset?.val);
  //       cql.SELECT.count = !!select.count;
  //       const carrier = await CarriersAPI.run(cql);

  //       return carrier;
  //     } else {
  //       return next();
  //     }
  //   });

  //   // PurItems?$expand=TR_Carriers
  //   this.on("READ", "PurItems", async (req, next) => {
  //     const expandIndex =
  //       req.query.SELECT.columns?.findIndex(
  //         ({ expand, ref }) => expand && ref[0] === "carrier"
  //       ) ?? -1;
  //     if (expandIndex < 0) return next();

  //     // Remove expand from query
  //     req.query.SELECT.columns.splice(expandIndex, 1);

  //     // Make sure object_ID will be returned
  //     if (
  //       !req.query.SELECT.columns.find((column) =>
  //         column.ref.find((ref) => ref == "carrier_ID")
  //       )
  //     )
  //       req.query.SELECT.columns.push({ ref: ["carrier_ID"] });

  //     const carriers = await next();

  //     const asArray = (x) => (Array.isArray(x) ? x : [x]);

  //     // Request all associated objects
  //     const TR_carrierIds = asArray(carriers).map(
  //       (carrier) => carrier.carrier_ID
  //     );
  //     const TR_carriers = await CarriersAPI.run(
  //       SELECT.from("smartDOCDraft.TR_Carriers").where({ ID: TR_carrierIds })
  //     );

  //     // Convert in a map for easier lookup
  //     const TR_carriersMap = {};
  //     for (const TR_carrier of TR_carriers)
  //       TR_carriersMap[TR_carrier.ID] = TR_carrier;

  //     // Add objects to result
  //     for (const carrier of asArray(carriers)) {
  //       carrier.carrier = TR_carriersMap[carrier.carrier_ID];
  //     }

  //     return carriers;
  //   });

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
      // Get object ID from sDOC
      const { plant_ID } = await this.run(
        SELECT.one("plant_ID").from("Airports").where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "plant"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "plant_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["plant_ID"] });

    const airports = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(airports).map((airport) => airport.plant_ID);
    const plants = await plantsAPI.run(
      SELECT.from("smartDOCDraft.Plants").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
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
      // Get object ID from sDOC
      const { plant_ID } = await this.run(
        SELECT.one("plant_ID").from("Carriers").where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "plant"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "plant_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["plant_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.plant_ID
    );
    const plants = await plantsAPI.run(
      SELECT.from("smartDOCDraft.Plants").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
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
      (select.from.ref[1] == "companyCode" ||
        select.from.ref[1].id === "companyCode")
    ) {
      // Get object ID from sDOC
      const { companyCode_ID } = await this.run(
        SELECT.one("companyCode_ID")
          .from("Carriers")
          .where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "companyCode"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "companyCode_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["companyCode_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.companyCode_ID
    );
    const plants = await CompanyCodesAPI.run(
      SELECT.from("smartDOCDraft.CompanyCodes").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
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
      (select.from.ref[1] == "controlKey" ||
        select.from.ref[1].id === "controlKey")
    ) {
      // Get object ID from sDOC
      const { controlKey_ID } = await this.run(
        SELECT.one("controlKey_ID")
          .from("Carriers")
          .where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "controlKey"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "controlKey_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["controlKey_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.controlKey_ID
    );
    const plants = await ControlKeysAPI.run(
      SELECT.from("smartDOCDraft.ControlKeys").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
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
      (select.from.ref[1] == "orderType" ||
        select.from.ref[1].id === "orderType")
    ) {
      var x = "orderType_ID";
      if (
        select.from.ref[1] == "awbOrderType" ||
        select.from.ref[1].id === "awbOrderType"
      ) {
        x = "awbOrderType_ID";
      }

      // Get object ID from sDOC
      const { orderType_ID } = await this.run(
        SELECT.one(x).from("Carriers").where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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

  // Carriers('...')/orderTypes
  this.on("READ", "OrderTypes", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "awbOrderType" ||
        select.from.ref[1].id === "awbOrderType")
    ) {
      x = "awbOrderType_ID";

      // Get object ID from sDOC
      const { awbOrderType_ID } = await this.run(
        SELECT.one(x).from("Carriers").where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.OrderTypes")
        .where("ID = ", awbOrderType_ID)
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "orderType"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "orderType_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["orderType_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.orderType_ID
    );
    const plants = await OrderTypesAPI.run(
      SELECT.from("smartDOCDraft.OrderTypes").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.orderType = plantsMap[FromEntity.orderType_ID];
    }

    return FromEntity_s;
  });

  // Carriers?$expand=orderTypes
  this.on("READ", "Carriers", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "awbOrderType"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "awbOrderType_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["awbOrderType_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.awbOrderType_ID
    );
    const plants = await OrderTypesAPI.run(
      SELECT.from("smartDOCDraft.OrderTypes").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.awbOrderType = plantsMap[FromEntity.awbOrderType_ID];
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
      (select.from.ref[1] == "materialGroup" ||
        select.from.ref[1].id === "materialGroup")
    ) {
      // Get object ID from sDOC
      const { materialGroup_ID } = await this.run(
        SELECT.one("materialGroup_ID")
          .from("Carriers")
          .where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "materialGroup"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "materialGroup_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["materialGroup_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.materialGroup_ID
    );
    const plants = await MaterialGroupsAPI.run(
      SELECT.from("smartDOCDraft.MaterialGroups").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
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
  const PurchaseOrganizationsAPI = await cds.connect.to(
    "ZGW_LS_FO_PURCHASE_ORG_SRV"
  );

  // Carriers('...')/purchaseOrganizations
  this.on("READ", "PurchaseOrganizations", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.Carriers" &&
      (select.from.ref[1] == "purchaseOrganization" ||
        select.from.ref[1].id === "purchaseOrganization")
    ) {
      // Get object ID from sDOC
      const { purchaseOrganization_ID } = await this.run(
        SELECT.one("purchaseOrganization_ID")
          .from("Carriers")
          .where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "purchaseOrganization"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "purchaseOrganization_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["purchaseOrganization_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.purchaseOrganization_ID
    );
    const plants = await PurchaseOrganizationsAPI.run(
      SELECT.from("smartDOCDraft.PurchaseOrganizations").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.purchaseOrganization =
        plantsMap[FromEntity.purchaseOrganization_ID];
    }

    return FromEntity_s;
  });

  // PurDocs('...')/purchaseOrganizations
  this.on("READ", "PurchaseOrganizations", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.PurDocs" &&
      (select.from.ref[1] == "purchaseOrganization" ||
        select.from.ref[1].id === "purchaseOrganization")
    ) {
      // Get object ID from sDOC
      const { purchaseOrganization_ID } = await this.run(
        SELECT.one("purchaseOrganization_ID")
          .from("PurDocs")
          .where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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

  // PurDocs?$expand=purchaseOrganizations
  this.on("READ", "PurDocs", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "purchaseOrganization"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "purchaseOrganization_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["purchaseOrganization_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.purchaseOrganization_ID
    );
    const plants = await PurchaseOrganizationsAPI.run(
      SELECT.from("smartDOCDraft.PurchaseOrganizations").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.purchaseOrganization =
        plantsMap[FromEntity.purchaseOrganization_ID];
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
      (select.from.ref[1] == "mainWorkCenter" ||
        select.from.ref[1].id === "mainWorkCenter")
    ) {
      // Get object ID from sDOC
      const { mainWorkCenter_ID } = await this.run(
        SELECT.one("mainWorkCenter_ID")
          .from("Carriers")
          .where(select.from.ref[0].where)
      );

      // Select all sDOCs for a object
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
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "mainWorkCenter"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "mainWorkCenter_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["mainWorkCenter_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.mainWorkCenter_ID
    );
    const plants = await WorkCentersAPI.run(
      SELECT.from("smartDOCDraft.WorkCenters").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.mainWorkCenter = plantsMap[FromEntity.mainWorkCenter_ID];
    }

    return FromEntity_s;
  });

  this.on("READ", "WorkCenters", async (req) => {
    return WorkCentersAPI.run(req.query);
  });

  ////////////////////////////////////////////////////////////
  // BusinessPartners
  ////////////////////////////////////////////////////////////
  const BusinessPartnersAPI = await cds.connect.to("API_BUSINESS_PARTNER");

  // PurDocs('...')/BusinessPartners
  this.on("READ", "BusinessPartners", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.PurDocs" &&
      (select.from.ref[1] == "vendor" || select.from.ref[1].id === "vendor")
    ) {
      // Get object ID from sDOC
      const { vendor_ID } = await this.run(
        SELECT.one("vendor_ID").from("PurDocs").where(select.from.ref[0].where)
      );

      // Select all sDOC for a object
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.BusinessPartners")
        .where("ID = ", vendor_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const vendor = await BusinessPartnersAPI.run(cql);

      return vendor;
    } else {
      return next();
    }
  });

  // PurDocs?$expand=BusinessPartners
  this.on("READ", "PurDocs", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "vendor"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "vendor_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["vendor_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.vendor_ID
    );
    const plants = await BusinessPartnersAPI.run(
      SELECT.from("smartDOCDraft.BusinessPartners").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.vendor = plantsMap[FromEntity.vendor_ID];
    }

    return FromEntity_s;
  });

  //   // PurItems('...')/BusinessPartners
  //   this.on("READ", "BusinessPartners", async (req, next) => {
  //     const select = req.query.SELECT;

  //     if (
  //       select.from.ref.length === 2 &&
  //       select.from.ref[0].id === "smartDOCDraft.PurItems" &&
  //       (select.from.ref[1] == "vendor" || select.from.ref[1].id === "vendor")
  //     ) {
  //       // Get object ID from sDOC
  //       const { vendor_ID } = await this.run(
  //         SELECT.one("vendor_ID").from("PurItems").where(select.from.ref[0].where)
  //       );

  //       // Select all sDOC for a object
  //       const cql = SELECT(select.columns)
  //         .from("smartDOCDraft.BusinessPartners")
  //         .where("ID = ", vendor_ID)
  //         .limit(select.limit?.rows?.val, select.limit?.offset?.val);
  //       cql.SELECT.count = !!select.count;
  //       const vendor = await BusinessPartnersAPI.run(cql);

  //       return vendor;
  //     } else {
  //       return next();
  //     }
  //   });

  //   // PurItems?$expand=BusinessPartners
  //   this.on("READ", "PurItems", async (req, next) => {
  //     const expandIndex =
  //       req.query.SELECT.columns?.findIndex(
  //         ({ expand, ref }) => expand && ref[0] === "vendor"
  //       ) ?? -1;
  //     if (expandIndex < 0) return next();

  //     // Remove expand from query
  //     req.query.SELECT.columns.splice(expandIndex, 1);

  //     // Make sure object_ID will be returned
  //     if (
  //       !req.query.SELECT.columns.find((column) =>
  //         column.ref.find((ref) => ref == "vendor_ID")
  //       )
  //     )
  //       req.query.SELECT.columns.push({ ref: ["vendor_ID"] });

  //     const FromEntity_s = await next();

  //     const asArray = (x) => (Array.isArray(x) ? x : [x]);

  //     // Request all associated objects
  //     const plantIds = asArray(FromEntity_s).map(
  //       (FromEntity) => FromEntity.vendor_ID
  //     );
  //     const plants = await BusinessPartnersAPI.run(
  //       SELECT.from("smartDOCDraft.BusinessPartners").where({ ID: plantIds })
  //     );

  //     // Convert in a map for easier lookup
  //     const plantsMap = {};
  //     for (const plant of plants) plantsMap[plant.ID] = plant;

  //     // Add objects to result
  //     for (const FromEntity of asArray(FromEntity_s)) {
  //       FromEntity.vendor = plantsMap[FromEntity.vendor_ID];
  //     }

  //     return FromEntity_s;
  //   });

  this.on("READ", "BusinessPartners", async (req) => {
    return BusinessPartnersAPI.run(req.query);
  });

  ////////////////////////////////////////////////////////////
  // BRF Data
  ////////////////////////////////////////////////////////////

  // // PurItems('...')/brf_id
  // this.on("READ", "brf_id", async (req, next) => {
  //   const select = req.query.SELECT;

  //   const BRF = await cds.connect.to("SAP_CF_BusinessRules_Repository");
  //   const response = await BRF.get("/v1/projects?Name=AP_AV&$top=100");

  //   const response1 = await BRF.get(
  //     "/v1/projects/" +
  //       response[0].Id +
  //       "/ruleservices?Name=rserv_ac_fra_landing&$top=100"
  //   );

  //   if (
  //     select.from.ref.length === 2 &&
  //     select.from.ref[0].id === "smartDOCDraft.PurItems" &&
  //     (select.from.ref[1] == "brf_id" || select.from.ref[1].id === "brf_id")
  //   ) {
  //     // Get object ID from sDOC
  //     const { serviceNumber_ID } = await this.run(
  //       SELECT.one("serviceNumber_ID")
  //         .from("PurItems")
  //         .where(select.from.ref[0].where)
  //     );

  //     // Select all sDOC for a object
  //     const cql = SELECT(select.columns)
  //       .from("smartDOCDraft.ServiceData")
  //       .where("ID = ", serviceNumber_ID)
  //       .limit(select.limit?.rows?.val, select.limit?.offset?.val);
  //     cql.SELECT.count = !!select.count;
  //     const vendor = await ServiceDataAPI.run(cql);

  //     return vendor;
  //   } else {
  //     return next();
  //   }
  // });

  // PurDocs?$expand=items
  this.on("READ", "PurDocs", async (req, next) => {
    // const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // for (const header of req)
    //     for (const items of header.items)

    //     const plantIds = asArray(FromEntity_s).map(
    //            (FromEntity) => FromEntity.ID
    //          );

    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "items"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref === "ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map((FromEntity) => FromEntity.ID);
    
    
    const plants = await this.run(
      SELECT.from("smartDOCDraft.PurItems").where({up__ID: FromEntity_s.ID, IsActiveEntity: FromEntity_s.IsActiveEntity } ));
    //{ up__ID: plantIds })

    // Convert in a map for easier lookup
    const plantsMap = [];
    const plantsMap2 = {};
    var count = 0;
    for (const plant of plants) {
      //plantsMap[plant.up__ID] = plant;
      plantsMap[count++] = plant;
      plantsMap2[plant.up__ID] = plantsMap;
    }
    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.items = plantsMap2[FromEntity.ID];
    }

    return FromEntity_s;
  });

  this.after("READ", "PurItems", async (req) => {
    if (req == null || req === null) {
      return req;
    }

    const select = req?.query;

    const asArray = (req) => (Array.isArray(req) ? req : [req]);

    for (const PurItem of asArray(req)) {
      PurDocs_ID = PurItem["up__ID"];

      if (PurItem["brf_id"] !== undefined) {
        if (
          PurItem["lineOfBusiness"] === undefined ||
          PurItem["up__ID"] === undefined ||
          PurItem["serviceNumber_ID"] === undefined
        ) {
          // Get object ID from sDOC
          const { brf_id } = await this.run(
            SELECT.one("*")
              .from("PurItems")
              .where(
                "up__ID = '" +
                  PurDocs_ID +
                  "'" +
                  " and " +
                  " ID = '" +
                  PurItem["ID"] +
                  "'" +
                  " and IsActiveEntity=false"
              )
          );

          if (brf_id !== undefined && brf_id !== undefined) {
            PurItem["brf_id"] = brf_id;
          }

          return req;
        }

        lineOfBusiness = PurItem["lineOfBusiness"];

        serviceNumber_ID = PurItem["serviceNumber_ID"];

        switch (lineOfBusiness) {
          case "airport":
            lineOfBusiness = "AC";
            break;
          case "cargo":
            lineOfBusiness = "CG";
            break;
          default:
        }

        const carrierResponse = await this.run(
          SELECT.one("carrier_ID")
            .from("PurDocs")
            .where("ID = '" + PurDocs_ID + "'")
        );

        if (!carrierResponse || !carrierResponse.carrier_ID) {
          return req;
        }

        // Get object ID from sDOC
        // const { carrier_ID } = await this.run(
        //   SELECT.one("carrier_ID")
        //     .from("PurDocs")
        //     .where("ID = '" + PurDocs_ID + "'")
        // );

        // Get object ID from sDOC
        const { airport_ID } = await this.run(
          SELECT.one("airport_ID")
            .from("PurDocs")
            .where("ID = '" + PurDocs_ID + "'")
        );

        const cx1 = lineOfBusiness + "_" + carrier_ID;

        const BRF = await cds.connect.to("SAP_CF_BusinessRules_Repository");
        const response = await BRF.get(
          "/v1/projects?Name=" + cx1 + "&$top=100"
        );

        // Select all sDOC for a object
        const ServiceDataAPI1 = await cds.connect.to("ZGW_LS_FO_SERVICE_SRV");
        const cql = SELECT("Name")
          .from("smartDOCDraft.ServiceData")
          .where("ID = ", serviceNumber_ID);
        // cql.SELECT.count = !!select.count;
        const service_name = await ServiceDataAPI1.run(cql);

        const cx3 = response[0]?.Id;
        const cx2 =
          "rserv_" +
          lineOfBusiness +
          "_" +
          airport_ID +
          "_" +
          service_name[0].Name;

        if (
          cx3 == "undefined" ||
          cx2 == "undefined" ||
          cx3 == null ||
          cx2 == null
        ) {
        } else {
          const response1 = await BRF.get(
            "/v1/projects/" +
              cx3 +
              "/ruleservices?Name=" +
              cx2.toLowerCase() +
              "&$top=100"
          );

          if (response1[0] != null) {
            PurItem["brf_id"] = response1[0].Id;
          }
        }
      }
    }

    return req;
  });

  ////////////////////////////////////////////////////////////
  // Service Data
  ////////////////////////////////////////////////////////////
  const ServiceDataAPI = await cds.connect.to("ZGW_LS_FO_SERVICE_SRV");

  // PurItems('...')/ServiceData
  this.on("READ", "ServiceData", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.PurItems" &&
      //select.from.ref[1].id === "items" &&
      (select.from.ref[1] == "serviceNumber" ||
        select.from.ref[1].id === "serviceNumber")
    ) {
      // Get object ID from sDOC
      const { serviceNumber_ID } = await this.run(
        SELECT.one("serviceNumber_ID")
          .from("PurItems")
          .where(select.from.ref[0].where)
      );

      // Select all sDOC for a object
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.ServiceData")
        .where("ID = ", serviceNumber_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const vendor = await ServiceDataAPI.run(cql);

      return vendor;
    } else {
      return next();
    }
  });

  // PurItems?$expand=ServiceData
  this.on("READ", "PurItems", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "serviceNumber"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "serviceNumber_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["serviceNumber_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.serviceNumber_ID
    );
    const plants = await ServiceDataAPI.run(
      SELECT.from("smartDOCDraft.ServiceData").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.serviceNumber = plantsMap[FromEntity.serviceNumber_ID];
    }

    return FromEntity_s;
  });

  this.on("READ", "ServiceData", async (req) => {
    return ServiceDataAPI.run(req.query);
  });

  ////////////////////////////////////////////////////////////
  // TR_Currencies
  ////////////////////////////////////////////////////////////
  const TR_CurrenciesAPI = await cds.connect.to("TripService");

  // PurItems('...')/TR_Currencies
  this.on("READ", "TR_Currencies", async (req, next) => {
    const select = req.query.SELECT;

    if (
      select.from.ref.length === 2 &&
      select.from.ref[0].id === "smartDOCDraft.PurItems" &&
      //&& select.from.ref[1].id === "items" ]
      (select.from.ref[1] == "currency" || select.from.ref[1].id === "currency")
    ) {
      // Get object ID from sDOC
      //var where_cond = select.from.ref[1].where + select.from.ref[0].where;
      //IsActiveEntity=true

      const { currency_ID } = await this.run(
        SELECT.one("currency_ID")
          .from("PurItems")
          .where(select.from.ref[0].where)
      );

      // Select all sDOC for a object
      const cql = SELECT(select.columns)
        .from("smartDOCDraft.TR_Currencies")
        .where("ID = ", currency_ID)
        .limit(select.limit?.rows?.val, select.limit?.offset?.val);
      cql.SELECT.count = !!select.count;
      const vendor = await TR_CurrenciesAPI.run(cql);

      return vendor;
    } else {
      return next();
    }
  });

  // PurItems?$expand=TR_Currencies
  this.on("READ", "PurItems", async (req, next) => {
    const expandIndex =
      req.query.SELECT.columns?.findIndex(
        ({ expand, ref }) => expand && ref[0] === "currency"
      ) ?? -1;
    if (expandIndex < 0) return next();

    // Remove expand from query
    req.query.SELECT.columns.splice(expandIndex, 1);

    // Make sure object_ID will be returned
    if (
      !req.query.SELECT.columns.find((column) =>
        column.ref.find((ref) => ref == "currency_ID")
      )
    )
      req.query.SELECT.columns.push({ ref: ["currency_ID"] });

    const FromEntity_s = await next();

    const asArray = (x) => (Array.isArray(x) ? x : [x]);

    // Request all associated objects
    const plantIds = asArray(FromEntity_s).map(
      (FromEntity) => FromEntity.currency_ID
    );
    const plants = await TR_CurrenciesAPI.run(
      SELECT.from("smartDOCDraft.TR_Currencies").where({ ID: plantIds })
    );

    // Convert in a map for easier lookup
    const plantsMap = {};
    for (const plant of plants) plantsMap[plant.ID] = plant;

    // Add objects to result
    for (const FromEntity of asArray(FromEntity_s)) {
      FromEntity.currency = plantsMap[FromEntity.currency_ID];
    }

    return FromEntity_s;
  });

  this.on("READ", "TR_Currencies", async (req) => {
    return TR_CurrenciesAPI.run(req.query);
  });
});
