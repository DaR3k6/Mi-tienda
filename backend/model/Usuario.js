const { DataTypes } = require("sequelize");
const sequelize = require("./Conexion");
const Rol = require("./Rol");

const Usuario = sequelize.define(
  "Usuario",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    cuidad: {
      type: DataTypes.STRING,
    },
    zonaPostal: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

Usuario.belongsTo(Rol, { foreignKey: "Rol_idRol" });
Rol.hasMany(Usuario, { foreignKey: "Rol_idRol" });

module.exports = Usuario;
