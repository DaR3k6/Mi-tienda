const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");
const detalleController = require("../controller/detalle");

router.post("/agregar", auth, detalleController.agregarDetalle);
router.get("/listarDetalle", detalleController.listarDetalle);
router.delete("/eliminar/:id", detalleController.eliminarDetalle);

module.exports = router;
