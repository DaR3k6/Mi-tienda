//CONFIGURO LOS ROUTERS
const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");
const carritoController = require("../controller/carrito");

//ROUTER DE CARRITO DE COMPRAS

router.post("/agregar", carritoController.agregarCarritoCompras);

router.get("/obtener", carritoController.obtenerCarrito);

router.post("/procesar-compra", carritoController.procesarCompra);

module.exports = router;
