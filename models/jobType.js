const JobType = (sequelize, DataTypes) => sequelize.define('JobType', {
    job_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    schema: "bestimator",
    freezeTableName: false,
    timestamps: false,
});

module.exports = JobType;