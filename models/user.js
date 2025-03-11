const User = (sequelize, DataTypes) => sequelize.define('User', {
    user_id: {
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
    freezeTableName: false,
    timestamps: false,
});

module.exports = User;