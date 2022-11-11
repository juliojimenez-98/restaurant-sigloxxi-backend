const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Pedido_ing = require("./pedido_ing");

const Recibo_pedido = dbConnection.dbConnection.define(
  "recibo_pedido",
  {
    id_recibo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_recibo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    detalle: {
      type: DataTypes.STRING,
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      references: {
        model: "Pedido_ing",
        key: "id_pedido",
      },
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Pedido_ing.hasOne(Recibo_pedido, { foreignKey: "id_pedido" });
Recibo_pedido.belongsTo(Pedido_ing, { foreignKey: "id_pedido" });

module.exports = Recibo_pedido;
