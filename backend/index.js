const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("../backend/model/Conexion");
require("dotenv/config.js");

// CONEXION MIDDLEWARE
app.use(cors());
app.use(express.json());

// RECIBIR BODY DE LOS FORMULARIOS
app.use(express.urlencoded({ extended: true }));

// Importa los modelos
const Usuario = require("../backend/model/Usuario");
const Rol = require("../backend/model/Rol");
const Producto = require("../backend/model/Producto");
const Categoria = require("../backend/model/Categoria");
const MetodoPago = require("../backend/model/MetodoPago");
const MetodoPago_has_Factura = require("../backend/model/MetodoPagoHas");
const Factura = require("../backend/model/Factura");
const Detalle = require("../backend/model/Detalle");

// Asocia los modelos con la base de datos
Rol.sync({ logging: false }).then(() => {
  Usuario.sync({ logging: false });
});
Categoria.sync({ logging: false }).then(() => {
  Producto.sync({ logging: false });
});
MetodoPago.sync({ logging: false }).then(() => {
  MetodoPago_has_Factura.sync({ logging: false });
});
Factura.sync({ logging: false }).then(() => {
  Detalle.sync({ logging: false });
});
// RUTAS DE MVC
const rutaUsuario = require("../backend/router/usuario");
app.use("/usuario", rutaUsuario);

const conexion = async () => {
  try {
    await sequelize.authenticate();
    app.listen(process.env.PUERTO, () => {
      console.log(
        `Aplicacion Ejecutandose en: http://localhost:${process.env.PUERTO}`
      );
    });

    console.log("Conexión a la base de datos establecida correctamente");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

conexion();
