const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");
const Producto = require("./Producto");

const Categoria = sequelize.define(
  "Categoria",
  {
    idCategoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "categoria",
    timestamps: false,
  }
);

module.exports = Categoria;
