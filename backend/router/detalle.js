const express = require("express");
const router = express.Router();
const detalleController = require("../controller/detalle");

router.post("/agregar", detalleController.agregarDetalle);
router.get("/listarDetalle", detalleController.listarDetalle);
router.delete("/eliminar/:id", detalleController.eliminarDetalle);

module.exports = router;
