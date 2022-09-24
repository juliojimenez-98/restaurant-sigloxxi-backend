const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Usuario = require("./usuario");

const Mesa = dbConnection.dbConnection.define(
  "mesa",
  {
    // Model attributes are defined here
    id_mesa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cant_sillas: {
      type: DataTypes.INTEGER,
    },
    disponibilidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Mesa;
