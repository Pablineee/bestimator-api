const ProvinceWeight = (sequelize, DataTypes) => sequelize.define('ProvinceWeight', {
    province_weight_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    province_weight: {
        type: DataTypes.DECIMAL(4,2),
        allowNull: false,
        default: 1.0,
    },
    province_tax_rate: {
        type: DataTypes.DECIMAL(4,2),
        allowNull: false,
    }
}, {
    schema: "bestimator",
    freezeTableName: false,
    timestamps: false,
});

module.exports = ProvinceWeight;