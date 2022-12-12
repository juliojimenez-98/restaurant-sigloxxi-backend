const { DataTypes, or } = require("sequelize");
const dbConnection = require("../database/config");
const Medio_pago = require("./medio_pago");
const PedidoCliente = require("./pedidoCliente");

const Venta = dbConnection.dbConnection.define(
  "venta",
  {
    id_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    monto: { type: DataTypes.INTEGER, allowNull: false },

    id_pago: {
      type: DataTypes.INTEGER,
      references: {
        model: "Medio_pago",
        key: "id_pago",
      },
      allowNull: false,
    },

    id_orden: {
      type: DataTypes.INTEGER,
      references: {
        model: "PedidoCliente",
        key: "id_orden",
      },
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Venta.hasMany(Medio_pago, {
  foreignKey: "id_pago",
});

Venta.hasOne(PedidoCliente, {
  foreignKey: "id_orden",
});

module.exports = Venta;
