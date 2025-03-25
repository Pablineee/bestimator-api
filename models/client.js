const Client = (sequelize, DataTypes) => sequelize.define('Client', {
    client_id: {
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
    freezeTableName: false,
    timestamps: false,
});

module.exports = Client;