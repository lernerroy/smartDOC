const cds = require ('@sap/cds');

//module.exports = cds.server;
module.exports = (o)=>{
  if (cds.env.requires.multitenancy) {
    cds.env.mtx.dependencies = [
 	JSON.parse(process.env.VCAP_SERVICES).destination[0].credentials.xsappname,
    JSON.parse(process.env.VCAP_SERVICES).connectivity[0].credentials.xsappname
    ]
  }
  return cds.server(o) //> delegate to default server.js
}