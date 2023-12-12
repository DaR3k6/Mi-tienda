const facturaModel = require("../model/Factura");
const metodoPago_has_FacturaModel = require("../model/MetodoPagoHas");

//CONTROLADOR DE AGREGAR FACTURA
const agregarFactura = async (req, res) => {
  try {
    const fechaActual = new Date();

    const { total, estado } = req.body;

    const facturaAgregada = await facturaModel.create({
      fecha: fechaActual,
      total,
      estado,
    });

    if (facturaAgregada) {
      return res.status(201).json({
        mensaje: "Factura agregada exitosamente",
        status: true,
        factura: facturaAgregada,
      });
    } else {
      return res.status(400).json({
        mensaje: "Error al agregar la factura",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al agregar la factura",
      status: false,
      error: error.message,
    });
  }
};

//CONTROLADOR ELIMINAR DETALLE
const eliminarFactura = async () => {
  try {
    const idFactura = req.params.id;

    const facturaEliminada = await facturaModel.destroy({
      where: {
        idFactura: idFactura,
      },
    });

    if (facturaEliminada) {
      return res.status(201).json({
        mensaje: "Factura eliminada exitosamente",
        status: true,
        factura: facturaEliminada,
      });
    } else {
      return res.status(400).json({
        mensaje: "Error al eliminar la factura",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al agregar la factura",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  agregarFactura,
};
