const { DataTypes, or } = require("sequelize");
const dbConnection = require("../database/config");

const Ingredientes = dbConnection.dbConnection.define(
  "ingredientes",
  {
    id_ing: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    stock_cri: { type: DataTypes.INTEGER, allowNull: false },
    fecha_vencimiento: { type: DataTypes.DATE, allowNull: false },
    unidad: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Ingredientes;
