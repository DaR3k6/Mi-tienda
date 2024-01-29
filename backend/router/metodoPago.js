const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");
const metodoPagoController = require("../controller/metodoPago");

router.get("/listar", auth, metodoPagoController.listarMetodoPago);

module.exports = router;
