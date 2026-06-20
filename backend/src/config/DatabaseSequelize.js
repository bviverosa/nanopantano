const { Sequelize } = require("sequelize");
const config = require("./DatabaseConfig");

const sequelize = new Sequelize(config.development);

module.exports = sequelize;
