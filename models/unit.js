const Unit = (sequelize, DataTypes) => sequelize.define('Unit', {
    unit_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    unit_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    schema: "bestimator",
    timestamps: false,
});

module.exports = Unit;