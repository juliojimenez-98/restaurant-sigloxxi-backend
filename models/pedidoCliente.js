const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Mesa = require("./mesa");
const Plato = require("./plato");

const PedidoCliente = dbConnection.dbConnection.define(
  "pedido_cliente",
  {
    id_orden: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tiempo_espera: { type: DataTypes.INTEGER },
    cant: { type: DataTypes.INTEGER, allowNull: false },
    platos: {
      type: DataTypes.STRING,
      get: function () {
        if (typeof this.getDataValue("platos") === "string") {
          return JSON.parse(this.getDataValue("platos"));
        }
      },
      set: function (val) {
        if (typeof val === "object") {
          return this.setDataValue("platos", JSON.stringify(val));
        }
      },
    },
    estado: { type: DataTypes.INTEGER },
    id_mesa: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Mesa.hasOne(PedidoCliente, { foreignKey: "id_mesa", as: "mesa" });
PedidoCliente.belongsTo(Mesa, { foreignKey: "id_mesa" });

module.exports = PedidoCliente;
