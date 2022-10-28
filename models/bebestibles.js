const { DataTypes, or } = require("sequelize");
const dbConnection = require("../database/config");
const PedidoCliente = require("./pedidoCliente");

const Bebestibles = dbConnection.dbConnection.define(
    "bebestibles",
    {
        id_bebida: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nombre: { type: DataTypes.STRING, allowNull: false },
        precio: {type: DataTypes.INTEGER, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false },
        stock_cri: { type: DataTypes.INTEGER, allowNull: false },
        fecha_vencimiento: { type: DataTypes.DATE, allowNull: false },
        unidad: { type: DataTypes.STRING, allowNull: false },
        id_orden: {type: DataTypes.INTEGER, allowNull: true },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Bebestibles.hasOne(PedidoCliente, {foreignKey:"id_pedido"});

module.exports = Bebestibles;