//CONFIGURO LOS ROUTERS
const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");
const usuarioController = require("../controller/usuario");

//ROUTER REGISTRO EL USUARIO
router.post("/registrando", usuarioController.registrarUsuario);

//ROUTER TRAER UN SOLO USUARIO
router.get("/TraerUnSolo/:id", auth, usuarioController.obtenerUsuarioPorId);

//ROUTER DE LOGIN DEL USUARIO
router.post("/login", usuarioController.loginUsuario);

module.exports = router;
