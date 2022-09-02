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
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    id_rol: {
      type: DataTypes.STRING,
      type: DataTypes.INTEGER,
      references: {
        model: "Rol", // 'fathers' refers to table name
        key: "id_rol", // 'id' refers to column name in fathers table
      },

      // get() {
      //   return this.getDataValue("id_rol").split(";");
      // },
      // set(val) {
      //   this.setDataValue("id_rol", val.join(";"));
      // },
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
