const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

module.exports = {
  development: {
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "1234",
    database: process.env.MYSQL_DATABASE || "nanopantano",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    logging: false,
  },
};
