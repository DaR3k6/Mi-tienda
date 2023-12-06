const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");

const Rol = sequelize.define(
  "Rol",
  {
    idRol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "rol",
    timestamps: false,
  }
);

module.exports = Rol;
