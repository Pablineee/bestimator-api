const Sequelize = require('sequelize');
const db = require('../config/db');

const Material = db.define('material', {
    material_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
});

module.exports = Material;