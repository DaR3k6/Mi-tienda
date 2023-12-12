//CONFIGURO LOS ROUTERS
const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");
const carritoController = require("../controller/carrito");

//ROUTER DE CARRITO DE COMPRAS

router.get("/obtener", carritoController.obtenerCarrito);

module.exports = router;
