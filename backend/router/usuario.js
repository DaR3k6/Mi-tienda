const express = require("express");
const router = express.Router();
const usuarioController = require("../controller/usuario");
const auth = require("../helper/jwt");

//RUTA DE TRAER TODOS LOS USUARIOS
router.get("usuario/TraerTods", usuarioController.obtenerTodosUsuarios);

//RUTA DE REGISTRAR USUARIO
router.post("usuario/registrarUsuario", usuarioController.registrarUsuario);

//RUTA DE TRAER UN SOLO USUARIO
router.get(
  "usuario/traerUnUsuario",
  auth,
  usuarioController.obtenerUsuarioPorId
);

//RUTA DE LOGEARSE
router.post("usuario/login", auth, usuarioController.loginUsuario);

module.exports = router;
