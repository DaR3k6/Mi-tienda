// Archivo: models/MetodoPago_has_Factura.js
const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");
const MetodoPago = require("./MetodoPago");
const Factura = require("./Factura");

const MetodoPago_has_Factura = sequelize.define(
  "MetodoPago_has_Factura",
  {
    MetodoPago_idMetodoPago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Factura_idFactura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "MetodoPago_has_Factura",
    timestamps: false,
  }
);

MetodoPago_has_Factura.belongsTo(MetodoPago, {
  foreignKey: "MetodoPago_idMetodoPago",
});
MetodoPago_has_Factura.belongsTo(Factura, { foreignKey: "Factura_idFactura" });

module.exports = MetodoPago_has_Factura;
