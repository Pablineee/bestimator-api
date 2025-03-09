'use strict';

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Database connection implementation transferred from /config/db.js (deleted)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false,
      },
  },
  logging: false, // Disable logging of SQL querries
  define: {
      schema: "bestimator"
  },
  pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
  },
});

const connectDB = async () => {
  try {
      await sequelize.authenticate();
      console.log("Connected to PostgreSQL...");
  } catch (error) {
      console.error(`Connection Error: ${error.message}`);
      process.exit(1); // Exit if database connection fails
  }
};

// Import models
const User = require('./user')(sequelize, Sequelize.DataTypes); // Avoids circular dependency
const Client = require('./client')(sequelize, Sequelize.DataTypes);
const Material = require('./material')(sequelize, Sequelize.DataTypes);
const Estimate = require('./estimate')(sequelize, Sequelize.DataTypes);
const JobType = require('./jobType')(sequelize, Sequelize.DataTypes);
const Unit = require('./unit')(sequelize, Sequelize.DataTypes);

// Define relationships

// Estimates linked to Users
User.hasMany(Estimate, { foreignKey: 'user_id' });
Estimate.belongsTo(User, { foreignKey: 'user_id' });

// Estimates linked to Clients
Client.hasMany(Estimate, { foreignKey: 'client_id' });
Estimate.belongsTo(Client, { foreignKey: 'client_id' });

// Materials linked to JobTypes
JobType.hasMany(Material, { foreignKey: 'job_type_id' });
Material.belongsTo(JobType, { foreignKey: 'job_type_id' });

// Materials linked to Units
Unit.hasMany(Material, { foreignKey: 'unit_id' });
Material.belongsTo(Unit, { foreignKey: 'unit_id' });

// JobTypes linked to Estimates
JobType.hasMany(Estimate, { foreignKey: 'job_type_id' });
Estimate.belongsTo(JobType, { foreignKey: 'job_type_id' });

module.exports = {
  sequelize, // Sequelize connection for syncing and queries
  Sequelize, // Sequelize class for DataTypes usage
  User,
  Client,
  Material,
  Estimate,
  JobType,
  Unit,
  connectDB,
};