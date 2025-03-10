// Using external status enum in case it is required
// in the Estimate controller's business logic
const status = require('../config/status');

const Estimate = (sequelize, DataTypes) => sequelize.define('Estimate', {
    estimate_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
});

module.exports = Estimate;