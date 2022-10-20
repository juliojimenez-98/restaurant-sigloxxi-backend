const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Receta = require("./receta");

const Plato = dbConnection.dbConnection.define(
  "plato",
  {
    id_plato: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    desc: {
      type: DataTypes.DOUBLE,
    },
    precio: {
      type: DataTypes.DOUBLE,
    },
    img: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    tipo_plato: {
      type: DataTypes.INTEGER,
    },
    id_receta: {
      type: DataTypes.INTEGER,
      references: {
        model: "Receta", // 'fathers' refers to table name
        key: "id_receta", // 'id' refers to column name in fathers table
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Receta.hasOne(Plato, { foreignKey: "id_receta", as: "receta" });
Plato.belongsTo(Receta, { foreignKey: "id_receta" });

module.exports = Plato;
