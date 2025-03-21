const { Unit } = require('../models/index');

const getUnits = async () => {
    const units = await Unit.findAll();
    return units;
};

const getUnitById = async (unitId) => {
    const unit = await Unit.findByPk(unitId);
    if (!unit) return null;
    return unit;
};

const addUnit = async (unitName) => {
    const newUnit = await Unit.create({
        unit_name: unitName
    });
    return newUnit;
};

const updateUnit = async (unitId, data) => {
    const updatedUnit = await Unit.update(
        { unit_name: data },
        {
            where: {
                unit_id: unitId
            }
        }
    );
    return updatedUnit;
};

const deleteUnit = async (unitId) => {
    const deletedUnit = await Unit.destroy({
        where: {
            unit_id: unitId
        }
    });
    return deletedUnit;
};

module.exports = {
    addUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit
};