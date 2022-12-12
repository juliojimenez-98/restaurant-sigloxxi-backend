const { DataTypes, or } = require("sequelize");
const dbConnection = require("../database/config");

const Medio_pago = dbConnection.dbConnection.define(
  "medio_pago",
  {
    id_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    tipo_pago: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Medio_pago;
