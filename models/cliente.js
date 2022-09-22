const { DataTypes, or } = require("sequelize");
const dbConnection = require("../database/config");

const Cliente = dbConnection.dbConnection.define(
  "cliente",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    appa: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
    },
    cel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Cliente;
