'use strict';

// Import necessary dependencies
const estimateStatus = require('../config/estimateStatus');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Ensure bestimator database exists
    await queryInterface.sequelize.query('CREATE SCHEMA IF NOT EXISTS bestimator;');

    // Create all tables
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'Users' }, {
      user_id: {
          type: Sequelize.DataTypes.STRING,
          primaryKey: true,
      },
      email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      first_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      last_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      company_name: {
          type: Sequelize.DataTypes.STRING,
      },
      phone_number: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
      },
      address: {
          type: Sequelize.DataTypes.STRING,
      },
      profile_image_url: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
      },
      is_active: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
      }
    });
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'Clients' }, {
      client_id: {
          type: Sequelize.DataTypes.STRING,
          primaryKey: true,
      },
      email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      first_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      last_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      company_name: {
          type: Sequelize.DataTypes.STRING,
      }
    });
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'JobTypes' }, {
      job_type_id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      job_type: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
      }
    });
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'Units' }, {
      unit_id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      unit_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
      }
    });
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'ProvinceWeights' }, {
      province_weight_id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      province: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      province_weight: {
          type: Sequelize.DataTypes.DECIMAL(4,2),
          allowNull: false,
          defaultValue: 1.0,
      },
      province_tax_rate: {
          type: Sequelize.DataTypes.DECIMAL(4,2),
          allowNull: false,
      },
    });
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'Materials' }, {
      material_id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      product_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
      },
      name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      product_title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      job_type_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'JobTypes' },
              key: 'job_type_id',
          },
      },
      price: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: true,
      },
      unit_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'Units' },
              key: 'unit_id',
          },
      },
      image_url: {
          type: Sequelize.DataTypes.JSON,
      },
      rating: {
          type: Sequelize.DataTypes.DECIMAL(4, 2),
      },
      product_url: {
          type: Sequelize.DataTypes.STRING,
      },
      coverage: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: true
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'Estimates' }, {
      estimate_id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'Users' },
              key: 'user_id',
          },
      },
      client_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'Clients' },
              key: "client_id",
          },
      },
      job_type_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'JobTypes' },
              key: 'job_type_id',
          },
      },
      province_weight_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'ProvinceWeights' },
              key: 'province_weight_id',
          },
      },
      costs: {
          type: Sequelize.DataTypes.JSON,
          allowNull: false,
      },
      additional_costs: {
          type: Sequelize.DataTypes.JSON,
          allowNull: true,
      },
      status: {
          type: Sequelize.DataTypes.ENUM(...Object.values(estimateStatus)),
          allowNull: false,
          defaultValue: estimateStatus.DRAFT,
      },
      notes: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
      },
      valid_until: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
      },
      total_cost: {
          type: Sequelize.DataTypes.DECIMAL(10, 2)
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
    await queryInterface.createTable({ schema: 'bestimator', tableName: 'EstimateMaterials' }, {
      estimate_material_id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      estimate_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'Estimates' },
              key: 'estimate_id',
          },
      },
      material_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
              model: { schema: 'bestimator', tableName: 'Materials' },
              key: 'material_id',
          },
      },
      quantity: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false,
      },
      initial_unit_cost: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false,
      },
      current_unit_cost: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: true,
      },
      total_cost: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.dropTable('EstimateMaterials');
    await queryInterface.dropTable('Estimates');
    await queryInterface.dropTable('Materials');
    await queryInterface.dropTable('ProvinceWeights');
    await queryInterface.dropTable('Units');
    await queryInterface.dropTable('JobTypes');
    await queryInterface.dropTable('Clients');
    await queryInterface.dropTable('Users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS bestimator."enum_Estimates_status";');
  }
};
