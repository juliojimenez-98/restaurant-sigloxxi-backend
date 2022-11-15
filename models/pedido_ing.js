const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Ingredientes = require("./ingredientes");
const Proveedor = require("./proveedor");
const Bebestible = require("./bebestibles");

const Pedido_ing = dbConnection.dbConnection.define(
  "pedido_ing",
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fecha_despacho: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      references: {
        model: "Proveedor",
        key: "id_proveedor",
      },
      allowNull: false,
    },
    id_ing: {
      type: DataTypes.INTEGER,
      references: {
        model: "Ingredientes",
        key: "id_ing",
      },
      allowNull: true,
    },
    id_bebida: {
      type: DataTypes.INTEGER,
      references: {
        model: "Bebestibles",
        key: "id_bebida",
      },
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Proveedor.hasOne(Pedido_ing, { foreignKey: "id_proveedor", as: "proveedor" });
Pedido_ing.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

Ingredientes.hasOne(Pedido_ing, { foreignKey: "id_ing", as: "ingrediente" });
Pedido_ing.belongsTo(Ingredientes, { foreignKey: "id_ing" });

Bebestible.hasOne(Pedido_ing, {foreignKey: "id_bebida"});
Pedido_ing.belongsTo(Bebestible, {foreignKey: "id_bebida"});

module.exports = Pedido_ing;
