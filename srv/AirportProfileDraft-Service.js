 const cds = require('@sap/cds')

/**
 * Implementation for Risk Management service defined in ./risk-service.cds
 */
module.exports = cds.service.impl(async function() {

    const plants = await cds.connect.to('ZGW_LS_FO_PLANT_SRV');


 this.on('READ', 'Plants', async req => {
        return plants.run(req.query);
    });
});