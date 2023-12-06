const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");

const MetodoPago = sequelize.define(
  "MetodoPago",
  {
    idMetodoPago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.TINYINT,
    },
  },
  {
    tableName: "metodopago",
    timestamps: false,
  }
);

module.exports = MetodoPago;
