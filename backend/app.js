const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv/config.js");

//CONEXION MIDDLEAWRE
app.use(cors());
app.use(express.json());

//RECIBIR BODY DE LOS FORMULARIOS
app.use(express.urlencoded({ extended: true }));

//RUTAS DE MVC
const rutaUsuario = require("../backend/router/usuario");

app.use("/", rutaUsuario);

app.listen(process.env.PUERTO, () => {
  console.log(
    `Aplicacion Ejecutandose en : http://localhost:${process.env.PUERTO}`
  );
});
