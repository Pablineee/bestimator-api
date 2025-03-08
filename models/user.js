const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = User;