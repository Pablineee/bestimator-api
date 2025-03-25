const { Material } = require('../models/index');

// Retrieve all product IDs in the Materials table
const getAllSkus = async () => {
    const data = await Material.findAll({
        attributes: ['product_id'],
    });
    const skus = [];

    data.forEach(sku => {
        skus.push(sku.dataValues.product_id);
    });
    // Return Array of all product IDs
    return skus;
};

// Update material prices in database
const updatePrices = async (priceData) => {
    try {
        for (const productId in priceData){
            if (priceData.hasOwnProperty(productId)){
                // Update price in database
                try {
                    const material = await Material.findOne({ where: { product_id: productId }});
                    let originalPrice = null;
                    if (!material){
                        console.error(`${new Date().toISOString()} --- Material with product ID: ${productId} not found in DB`);
                        continue;
                    } else {
                        originalPrice = material.price;
                    }
                    
                    // Ensure prices with more than two decimal places are not rounded up
                    const match = priceData[productId].toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
                    const updatedPrice = match ? parseFloat(match): null; // Make price null if regex match fails
                    // Update price only if updated price is different from original price
                    if (updatedPrice !== null && updatedPrice !== originalPrice){
                        const priceUpdated = await Material.update(
                            { price: updatedPrice },
                            {
                                where: {
                                    product_id: productId
                                }
                            }
                        );

                        // Check if price update was successful
                        if (priceUpdated[0] === 0){ // Check if the row was updated
                            console.log(`${new Date().toISOString()} --- Material with product ID: ${productId} could not be updated`);
                        }
                        console.log(`${new Date().toISOString()} --- Material with product ID: ${productId} was successfully updated from ${originalPrice} to ${updatedPrice}`);

                    } else {
                        console.error(`${new Date().toISOString()} --- Material with product ID: ${productId} has an invalid price`);
                    }

                } catch(err){
                    console.error(`${new Date().toISOString()} --- Material with product ID: ${productId} could not be updated; ${err.message}`);
                }
            } else {
                console.log(`${new Date().toISOString()} --- Material with product ID: ${productId} does not exist`);
            }
        }
    } catch(err){
        throw new Error(`Error: ${err.message}`);
    }
};

module.exports = {
    getAllSkus,
    updatePrices
};