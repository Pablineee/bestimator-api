const EstimateMaterial = (sequelize, DataTypes) => sequelize.define('EstimateMaterial', {
    estimate_material_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    estimate_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Estimate",
            key: "estimate_id",
        },
    },
    material_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Material",
            key: "material_id",
        },
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    initial_unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    current_unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    total_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    schema: "bestimator",
    freezeTableName: true,
    timestamps: false
});

module.exports = EstimateMaterial;