const { DataTypes, or } = require("sequelize");
const dbConnection = require("../database/config");

const Receta = dbConnection.dbConnection.define(
  "receta",
  {
    id_receta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre_prep: { type: DataTypes.STRING, allowNull: false },
    prep: { type: DataTypes.STRING, allowNull: false },
    tiempo_prep: { type: DataTypes.INTEGER, allowNull: false },
    id_ing: {
      type: DataTypes.INTEGER,
      references: {
        model: "Ingredientes", // 'fathers' refers to table name
        key: "id_ing", // 'id' refers to column name in fathers table
      },
      allowNull: true,
    },
    ingredientes: {
      type: DataTypes.STRING,
      allowNull: false,
      get: function () {
        if (typeof this.getDataValue("ingredientes") === "string") {
          return JSON.parse(this.getDataValue("ingredientes"));
        }
      },
      set: function (val) {
        if (typeof val === "object") {
          return this.setDataValue("ingredientes", JSON.stringify(val));
        }
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Receta;
