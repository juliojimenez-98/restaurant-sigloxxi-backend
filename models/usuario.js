const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");

const Usuarios = dbConnection.dbConnection.define("usuario", {
  // Model attributes are defined here
  nombre: {
    type: DataTypes.STRING,
  },
  apellido: {
    type: DataTypes.STRING,
  },
  rut: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
});

module.exports = Usuarios;
