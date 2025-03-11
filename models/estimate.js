const estimateStatus = require('../config/estimateStatus');

const Estimate = (sequelize, DataTypes) => sequelize.define('Estimate', {
    estimate_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "User",
            key: "user_id",
        },
    },
    client_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Client",
            key: "client_id",
        },
    },
    job_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "JobType",
            key: "job_type_id",
        },
    },
    province_weight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "ProvinceWeight",
            key: "province_weight_id",
        },
    },
    costs: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    additional_costs: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(estimateStatus)),
        allowNull: false,
        defaultValue: estimateStatus.DRAFT,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    valid_until: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    total_cost: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    schema: "bestimator",
    freezeTableName: true
});

module.exports = Estimate;