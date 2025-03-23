const { Material, JobType, Unit } = require('../models/index');
const { v4: uuid } = require('uuid');

// Get all materials
const getMaterials = async () => {
    const materials = await Material.findAll({
        include: [
            {
                model: JobType,
                attributes: ['job_type_id', 'job_type'],
            },
            {
                model: Unit,
                attributes: ['unit_id', 'unit_name'],
            }
        ]
    });
    return materials;
};

// Get material by ID
const getMaterialById = async (materialId) => {
    return await Material.findByPk(materialId);
};

// Create new material
const addMaterial = async (data) => {
    const newMaterial = await Material.create({
        material_id: uuid(),
        product_id: data.product_id,
        name: data.name,
        product_title: data.product_title,
        job_type_id: data.job_type_id,
        price: data.price,
        unit_id: data.unit_id,
        image_url: data.image_url,
        rating: data.rating,
        product_url: data.product_url,
        coverage: data.coverage
    });
    return newMaterial;
};

// Update existing material
const updateMaterial = async (materialId, data) => {
    const [updatedRows, updatedMaterials] = await Material.update(
        { ...data },
        {
            where: { material_id: materialId },
            returning: true // Returns array of updated materials
        }
    );

    // Return updated material if rows were updated, otherwise return null
    return updatedRows > 0 ? updatedMaterials[0] : null;
};

// Delete existing material
const deleteMaterial = async (materialId) => {
    const deletedRows = await Material.destroy({
        where: {
            material_id: materialId
        }
    });

    return deletedRows > 0; // Returns true if deletion occurred
};

module.exports = {
    addMaterial,
    getMaterialById,
    getMaterials,
    updateMaterial,
    deleteMaterial
};