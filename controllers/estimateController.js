const { Estimate, EstimateMaterial, Material, JobType, ProvinceWeight, User, Client } = require('../models/index');
const { v4: uuid } = require('uuid');

/**
 * Create a painting estimate based on room dimensions and paint type
 * @param {Object} data - The estimate data
 * @param {string} data.user_id - User ID
 * @param {string} data.client_id - Client ID
 * @param {number} data.surface_area - Surface area to be painted in square feet
 * @param {string} data.paint_type_id - Material ID for the selected paint
 * @param {number} data.province_weight_id - Province weight ID for tax and regional pricing
 * @param {Object} data.additional_costs - Additional costs like labor, prep work, etc.
 * @param {string} data.notes - Any notes for the estimate
 * @param {Date} data.valid_until - Validity date for the estimate
 * @returns {Object} The created estimate with cost breakdown
 */
const createPaintingEstimate = async (data) => {
    try {
        // Validate required fields
        if (!data.user_id || !data.client_id || !data.surface_area || !data.paint_type_id || !data.province_weight_id) {
            throw new Error('Missing required fields for painting estimate');
        }

        // Get paint details from Material model
        const paintMaterial = await Material.findByPk(data.paint_type_id);
        if (!paintMaterial) {
            throw new Error('Invalid paint type selected');
        }

        // Get province details for tax calculation
        const provinceData = await ProvinceWeight.findByPk(data.province_weight_id);
        if (!provinceData) {
            throw new Error('Invalid province selected');
        }

        // Get job type (painting)
        const jobType = await JobType.findOne({
            where: {
                job_type: 'Painting'
            }
        });
        if (!jobType) {
            throw new Error('Painting job type not found');
        }

        // Calculate number of paint cans needed with 10% error margin
        // paintMaterial.coverage is in sq ft per can
        const errorPercentage = 1.10; // 10% error margin
        const numberOfCans = Math.ceil(data.surface_area / paintMaterial.coverage * errorPercentage);
        
        // Calculate paint cost
        const paintCost = numberOfCans * paintMaterial.price;
        
        // Calculate additional costs (labor, supplies, etc.)
        const additionalCostsSum = Object.values(data.additional_costs || {}).reduce(
            (sum, cost) => sum + parseFloat(cost || 0), 
            0
        );
        
        // Calculate subtotal before tax
        const subtotal = paintCost + additionalCostsSum;
        
        // Calculate tax
        const taxRate = provinceData.province_tax_rate / 100; // Convert percentage to decimal
        const taxAmount = subtotal * taxRate;
        
        // Calculate total cost
        const totalCost = subtotal + taxAmount;
        
        // Prepare cost breakdown
        const costsBreakdown = {
            paint: {
                materialCost: paintCost,
                unitPrice: paintMaterial.price,
                quantity: numberOfCans,
                coverage: paintMaterial.coverage
            },
            additionalCosts: data.additional_costs || {},
            subtotal: subtotal,
            tax: {
                rate: provinceData.province_tax_rate,
                amount: taxAmount
            },
            total: totalCost
        };
        
        // Create the estimate
        const estimateId = uuid();
        const newEstimate = await Estimate.create({
            estimate_id: estimateId,
            user_id: data.user_id,
            client_id: data.client_id,
            job_type_id: jobType.job_type_id,
            province_weight_id: data.province_weight_id,
            costs: costsBreakdown,
            additional_costs: data.additional_costs || {},
            status: 'Draft',
            notes: data.notes || '',
            valid_until: data.valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
            total_cost: totalCost
        });
        
        // Create estimate-material relationship
        await EstimateMaterial.create({
            estimate_material_id: uuid(),
            estimate_id: estimateId,
            material_id: paintMaterial.material_id,
            quantity: numberOfCans,
            initial_unit_cost: paintMaterial.price,
            current_unit_cost: paintMaterial.price,
            total_cost: paintCost
        });
        
        // Fetch the complete estimate with all relationships
        const completeEstimate = await getEstimateById(data.user_id, estimateId);
        
        return {
            estimate: completeEstimate,
            costBreakdown: costsBreakdown
        };
    } catch (error) {
        throw new Error(`Failed to create painting estimate: ${error.message}`);
    }
};

// Get an estimate by ID (reusing existing function)
const getEstimateById = async (userId, estimateId) => {
    const estimate = await Estimate.findByPk(estimateId, {
        where: {
            user_id: userId
        },
        include: [
            { model: User, attributes: ['user_id', 'email', 'first_name', 'last_name'] },
            { model: Client, attributes: ['client_id', 'email', 'first_name', 'last_name'] },
            { model: JobType, attributes: ['job_type'] },
            { model: ProvinceWeight, attributes: ['province', 'province_weight', 'province_tax_rate'] },
            { 
                model: Material,
                attributes: ['name', 'price', 'unit_id', 'coverage'],
                through: {
                    attributes: ['quantity', 'initial_unit_cost', 'total_cost']
                }
            }
        ]
    });
    return estimate;
};

module.exports = {
    // Include existing functions
    ...require('./estimateController'),
    // Add new painting-specific function
    createPaintingEstimate
};