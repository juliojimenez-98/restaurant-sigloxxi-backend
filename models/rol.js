const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Usuario = require("./usuario");

const Rol = dbConnection.dbConnection.define(
  "rol",
  {
    // Model attributes are defined here
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nom_rol: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Rol;
