const { ProvinceWeight } = require('../models/index');

const getProvinceWeights = async () => {
    const provinceWeights = await ProvinceWeight.findAll();
    return provinceWeights;
};

const getProvinceWeightById = async (provinceWeightId) => {
    const provinceWeight = await ProvinceWeight.findByPk(provinceWeightId);
    if (!provinceWeight) return null;
    return provinceWeight;
};

const addProvinceWeight = async (data) => {
    const newProvinceWeight = await ProvinceWeight.create({
        province: data.province,
        province_weight: data.province_weight,
        province_tax_rate: data.province_tax_rate
    });
    return newProvinceWeight;
};

const updateProvinceWeight = async (provinceWeightId, data) => {
    const updatedProvinceWeight = await ProvinceWeight.update(
        {
            province: data.province,
            province_weight: data.province_weight,
            province_tax_rate: data.province_tax_rate
        },
        {
            where: {
                province_weight_id: provinceWeightId
            }
        }
    );
    return updatedProvinceWeight;
};

const deleteProvinceWeight = async (provinceWeightId) => {
    const deletedProvinceWeight = await ProvinceWeight.destroy({
        where: {
            province_weight_id: provinceWeightId
        }
    });
    return deletedProvinceWeight;
};

module.exports = {
    addProvinceWeight,
    getProvinceWeights,
    getProvinceWeightById,
    updateProvinceWeight,
    deleteProvinceWeight
};