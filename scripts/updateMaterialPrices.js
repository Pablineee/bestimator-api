const { fetchPricesInBatches } = require('../services/homeDepotService');
const { updatePrices } = require('../services/databaseService');

const updateMaterialPrices = async () => {
    try {
        // Get list of product IDs in the database and retrieve 
        // their latest prices from the Home Depot API
        const updatedPrices = await fetchPricesInBatches();
    
        // Update database with latest price data
        await updatePrices(updatedPrices)
        console.log(`${new Date().toISOString()} --- Material prices successfully updated`);
    } catch(err){
        console.error(`Error: ${err.message}`);
    }
};

updateMaterialPrices();