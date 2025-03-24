const { Estimate, EstimateMaterial, Material, JobType, ProvinceWeight, User, Client } = require('../models/index');
const { v4: uuid } = require('uuid');

// Get all estimates
const getEstimates = async () => {
    const estimates = await Estimate.findAll({
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
    return estimates;
};

// Get an estimate by ID
const getEstimateById = async (estimateId) => {
    const estimate = await Estimate.findByPk(estimateId, {
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

// Create a new estimate
const createEstimate = async (data) => {
    // Check if data exists
    const userExists = await User.findByPk(data.user_id);
    const clientExists = await Client.findByPk(data.client_id);
    const jobTypeExists = await JobType.findByPk(data.job_type_id);
    const provinceExists = await ProvinceWeight.findByPk(data.province_weight_id);

    if (!userExists || !clientExists || !jobTypeExists || !provinceExists) {
        throw new Error('Invalid reference: User, Client, Job Type, or Province does not exist.');
    }

    const estimateId = uuid();
    const newEstimate = await Estimate.create({
        estimate_id: estimateId,
        user_id: data.user_id,
        client_id: data.client_id,
        job_type_id: data.job_type_id,
        province_weight_id: data.province_weight_id,
        costs: data.costs,
        additional_costs: data.additional_costs,
        status: data.status,
        notes: data.notes,
        valid_until: data.valid_until,
        total_cost: data.total_cost
    });

    // Link materials to estimate, if present
    if (data.materials && data.materials.length > 0) {
        const materialsData = data.materials.map(material => ({
            estimate_material_id: uuid(),
            estimate_id: estimateId,
            material_id: material.material_id,
            quantity: material.quantity,
            initial_unit_cost: material.initial_unit_cost,
            current_unit_cost: material.current_unit_cost,
            total_cost: material.total_cost
        }));

        await EstimateMaterial.bulkCreate(materialsData);
    }

    return newEstimate;
};

// Update an existing estimate
const updateEstimate = async (estimateId, data) => {
    const estimate = await Estimate.findByPk(estimateId);
    if (!estimate) return null;

    const [updatedRows, updatedEstimates] = await Estimate.update(
        { ...data },
        {
            where: { estimate_id: estimateId },
            returning: true // Returns array of updated estimates
        }
    );

    // Return updated estimate if rows were updated, otherwise return null
    return updatedRows > 0 ? updatedEstimates[0] : null;
};

// Delete an estimate
const deleteEstimate = async (estimateId) => {
    const estimate = await Estimate.findByPk(estimateId);
    if (!estimate) return null;

    const deletedRows = await Estimate.destroy({
        where: {
            estimate_id: estimateId
        }
    });

    return deletedRows > 0; // Returns true if deletion occurred
};

module.exports = {
    getEstimates,
    getEstimateById,
    createEstimate,
    updateEstimate,
    deleteEstimate
};