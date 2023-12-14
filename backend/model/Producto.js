const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");
const Categoria = require("./Categoria");
const Producto = sequelize.define(
  "Producto",
  {
    idProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    marca: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.STRING,
    },
    calificacion: {
      type: DataTypes.INTEGER,
    },
    fechaPublicacion: {
      type: DataTypes.DATE,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "producto",
    timestamps: false,
  }
);
Producto.belongsTo(Categoria, { foreignKey: "Categoria_idCategoria" });
Categoria.hasMany(Producto, { foreignKey: "Categoria_idCategoria" });

module.exports = Producto;
