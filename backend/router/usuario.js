//CONFIGURO LOS ROUTERS
const express = require("express");
const router = express.Router();
//const auth = require("../controller/auth");
const usuarioController = require("../controller/usuario");

//ROUTER REGISTRO EL USUARIO
router.post("/usuario/registrando", usuarioController.registrarUsuario);

module.exports = router;
