const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Cliente = require("./cliente");

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
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: "Cliente", // 'fathers' refers to table name
        key: "id_cliente", // 'id' refers to column name in fathers table
      },
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

Cliente.hasOne(Reserva, { foreignKey: "id_cliente" });
Reserva.belongsTo(Cliente, { foreignKey: "id_cliente" });

module.exports = Reserva;
