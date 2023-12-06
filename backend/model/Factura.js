const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");
const MetodoPago = require("./MetodoPago");

const Factura = sequelize.define(
  "Factura",
  {
    idFactura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    total: {
      type: DataTypes.DECIMAL(10, 0),
    },
    estado: {
      type: DataTypes.TINYINT,
    },
  },
  {
    tableName: "factura",
    timestamps: false,
  }
);

Factura.belongsToMany(MetodoPago, {
  through: "MetodoPago_has_Factura",
  foreignKey: "Factura_idFactura",
});
MetodoPago.belongsToMany(Factura, {
  through: "MetodoPago_has_Factura",
  foreignKey: "MetodoPago_idMetodoPago",
});

module.exports = Factura;
