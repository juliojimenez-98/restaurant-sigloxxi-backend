const { Sequelize } = require("sequelize");

const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "bvmviby8oltbwoseilpw-mysql.services.clever-cloud.com",
    port: 3306,
    dialect: "mysql",
  }
);

module.exports = {
  dbConnection,
};
