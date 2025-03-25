const { getAllSkus } = require('./databaseService');
const fetch = (...args) => import('node-fetch')
    .then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
dotenv.config();

// Contact Home Depot API and fetch updated prices
const fetchPricesBySkus = async (skus) => {
    const apiKey = process.env.HOME_DEPOT_API_KEY;
    const homeDepotApiUrl = 'https://serpapi.com/search.json?engine=home_depot&country=ca&q='
    const query = skus.join('+').trim();
    const requestQuery = homeDepotApiUrl + query + '&store=7080&api_key=' + apiKey;

    // Where updated prices will be stored { 'product_id': updated_price }
    let updatedPrices = new Object();

    // Fetch results from Home Depot API
    try {
        const response = await fetch(requestQuery);
        const data = await response.json();

        // Extract updated prices from JSON data and add them to updatedPrices Object
        const products = data.products;
        for (let i = 0; i < products.length; i++){
            const updatedPrice = parseFloat(products[i].price);
            if (!isNaN(updatedPrice) && updatedPrice !== null){
                updatedPrices[products[i].product_id] = updatedPrice;
            }
        }
    } catch(err){
        console.error(`Error: ${err.message}`);
    }

    // Return Object containing product IDs and respective updated prices
    return updatedPrices;
};

const fetchPricesInBatches = async () => {
    // Retrieve all product IDs from database

    const skus = await getAllSkus();

    // Object used to store product IDs and their respective updated prices
    const updatedPrices = new Object();

    try {
        // Retrieve updated prices in batches of 40 product IDs
        if (skus.length > 40){
            // skus Array contains more than 40 product IDs
            const batches = Math.ceil(skus.length / 40);

            for (let i = 0; i < batches; i++){
                const start = i * 40;
                const end = (i + 1) * 40;
                const batch = skus.slice(start, end);
                const results = await fetchPricesBySkus(batch);

                Object.assign(updatedPrices, results);
            };

        } else {
            // skus Array contains 40 product IDs or less
            const batchResults = await fetchPricesBySkus(skus);
            Object.assign(updatedPrices, batchResults);
        }

        // Return results as an object of key value pairs (e.g., { 'material_product_id': 24.97 })
        return updatedPrices;

    } catch(err){
        console.error(`Error: ${err.message}`);
    }
};

module.exports = {
    fetchPricesBySkus,
    fetchPricesInBatches
}