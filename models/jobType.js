const { DataTypes } = require('sequelize');
const db = require('../config/db');

const JobType = db.define('JobType', {
    job_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    schema: "bestimator",
    timestamps: false,
});

module.exports = JobType;