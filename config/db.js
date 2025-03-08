const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

sequelize.sync({ force: false })
.then(() => {
    console.log('Database syncronized');
})
.catch((error) => {
    console.error(`Falied to syncronize database: ${error.message}`);
});

module.exports = sequelize;