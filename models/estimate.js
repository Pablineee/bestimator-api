const Sequelize = require('sequelize');
const db = require('../config/db');

const Estimate = db.define('estimate', {
    estimate_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
});

module.exports = Estimate;