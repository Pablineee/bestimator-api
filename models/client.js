const Client = (sequelize, DataTypes) => sequelize.define('Client', {
    client_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
    }
}, {
    schema: "bestimator",
    timestamps: false,
});

module.exports = Client;