const facturaModel = require("../model/Factura");

//CONTROLADOR DE AGREGAR FACTURA
const agregarFactura = async (req, res) => {
  try {
    const { fecha, total, estado } = req.body;

    const facturaAgregada = await facturaModel.create({
      fecha,
      total,
      estado,
      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al agregar la factura",
      status: false,
      error: error.message,
    });
  }
};
