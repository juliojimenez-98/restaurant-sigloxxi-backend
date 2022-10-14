const {DataTypes} = require("sequelize");
const dbConnection = require("../database/config");
const Ingredientes = require("./ingredientes");
const Proveedor = require("./proveedor");

const Pedido_ing = dbConnection.dbConnection.define(
    "pedido_ing",
    {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        fecha_despacho:{
            type:DataTypes.DATE,
            allowNull: false,
        },
        cantidad:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        precio:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_proveedor:{
            type: DataTypes.INTEGER,
            references:{
                model: "Proveedor",
                key: "id_proveedor",
            },
            allowNull: false,
        },
        id_ing:{
            type: DataTypes.INTEGER,
            references:{
                model:"Ingredientes",
                key:"id_ing",
            },
            allowNull: false,            
        },
    },
    {
        freezeTableName: true,
    }
);

Pedido_ing.hasOne(Proveedor, {foreignKey: "id_proveedor"});
Pedido_ing.hasOne(Ingredientes, {foreignKey: "id_ing"});

module.exports = Pedido_ing;