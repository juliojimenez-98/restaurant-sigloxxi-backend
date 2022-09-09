const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");
const Rol = require("./rol");

const Usuario = dbConnection.dbConnection.define(
  "usuario",
  {
    // Model attributes are defined here
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    appa: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      references: {
        model: "Rol", // 'fathers' refers to table name
        key: "id_rol", // 'id' refers to column name in fathers table
      },
      allowNull: true,
    },
    rolArray: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("rolArray"));
      },
      set: function (val) {
        return this.setDataValue("rolArray", JSON.stringify(val));
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 2,
    },
  },
  {
    freezeTableName: true,
  }
);

Usuario.belongsTo(Rol, { foreignKey: "id_rol" });
Usuario.hasMany(Rol, {
  foreignKey: "id_rol",
}); // Set one to many relationship

module.exports = Usuario;
