const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Usuario = require("./usuario");

const Reserva = dbConnection.dbConnection.define(
  "reserva",
  {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    hora_reserva: {
      type: DataTypes.TIME,
      primaryKey: true,
    },
    cant_personas: {
      type: DataTypes.INTEGER,
    },
    fecha_reserva: {
      type: DataTypes.DATE,
      defaultValue: 0,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    id_mesa: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Reserva;
