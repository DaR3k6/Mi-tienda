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

// IMPORTO EL MODELO
const Usuario = require("../backend/model/Usuario");
const Rol = require("../backend/model/Rol");
const Producto = require("../backend/model/Producto");
const Categoria = require("../backend/model/Categoria");
const MetodoPago = require("../backend/model/MetodoPago");
const MetodoPago_has_Factura = require("../backend/model/MetodoPagoHas");
const Factura = require("../backend/model/Factura");
const Detalle = require("../backend/model/Detalle");

//ASOCIADOS CON EL MODELO
Rol.sync({ logging: false }).then(async () => {
  //INSERTA EN LA BASE DE DATOS LOS ROLES
  const adminRol = await Rol.findOne({ where: { nombre: "Administrador" } });

  if (!adminRol) {
    await Rol.create({ nombre: "Administrador" });
  }

  const clienteRol = await Rol.findOne({ where: { nombre: "Cliente" } });

  if (!clienteRol) {
    await Rol.create({ nombre: "Cliente" });
  }

  Usuario.sync({ logging: false });
});
Categoria.sync({ logging: false }).then(() => {
  Producto.sync({ logging: false });
});
MetodoPago.sync({ logging: false }).then(async () => {
  //INSERTO LOS METODOS DE PAGO QUE EXISTEN
  const metodoPagoInciales = [
    {
      descripcion: "Tarjeta de crédito",
      estado: 1,
    },
    { descripcion: "Transferencia bancaria", estado: 1 },
  ];

  for (const metodoPagoInicial of metodoPagoInciales) {
    const metodoPagoExistente = await MetodoPago.findOne({
      where: { descripcion: metodoPagoInicial.descripcion },
    });

    if (!metodoPagoExistente) {
      await MetodoPago.create(metodoPagoInicial);
    }
  }

  MetodoPago_has_Factura.sync({ logging: false });
});
Factura.sync({ logging: false }).then(() => {
  Detalle.sync({ logging: false });
});

// RUTAS DE MVC
const rutaUsuario = require("../backend/router/usuario");
const rutaProducto = require("../backend/router/productos");
const rutaCarritoCompras = require("../backend/router/carrito");

app.use("/usuario", rutaUsuario);
app.use("/productos", rutaProducto);
app.use("/carritoCompras", rutaCarritoCompras);

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
