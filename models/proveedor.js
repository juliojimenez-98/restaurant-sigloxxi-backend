const {DataTypes, or } = require("sequelize");
const dbConnection = require("../database/config");

const Proveedor = dbConnection.dbConnection.define(
    "proveedor",
    {
        id_proveedor:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nombre: {type: DataTypes.STRING, allowNull: false},
        tel_contacto: {type: DataTypes.STRING, allowNull: false},
        email: { type: DataTypes.STRING, allowNull: false},
        sitio_web: {type: DataTypes.STRING},   
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Proveedor;