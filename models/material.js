const Material = (sequelize, DataTypes) => sequelize.define('Material', {
    material_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: true, // Product ID from Home Depot API
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Name used in Bestimator API PostgreSQL database
        unique: true,
    },
    product_title: {
        type: DataTypes.STRING,
        allowNull: false, // Product title used in Home Depot API
    },
    job_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "JobType",
            key: "job_type_id",
        },
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Unit",
            key: "unit_id",
        },
    },
    image_url: {
        type: DataTypes.JSON, // May contain multiple image urls
    },
    rating: {
        type: DataTypes.DECIMAL(4, 2),
    },
    product_url: {
        type: DataTypes.STRING,
    },
}, {
    schema: "bestimator",
    freezeTableName: false
});

module.exports = Material;