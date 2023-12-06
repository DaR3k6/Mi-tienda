const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");
const Factura = require("./Factura");
const Producto = require("./Producto");

const Detalle = sequelize.define(
  "Detalle",
  {
    idDetalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
    },
    precioUnitario: {
      type: DataTypes.DECIMAL(10, 0),
    },
  },
  {
    tableName: "detalle",
    timestamps: false,
  }
);
Detalle.belongsTo(Factura, { foreignKey: "Factura_idFactura" });
Detalle.belongsTo(Producto, { foreignKey: "Producto_idProducto" });

module.exports = Detalle;
