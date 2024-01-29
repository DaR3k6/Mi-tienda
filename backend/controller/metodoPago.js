const metodoPagoModelo = require("../model/MetodoPago");

const listarMetodoPago = async (req, res) => {
  try {
    const metodoPago = await metodoPagoModelo.findAll();

    if (!metodoPago) {
      return res.status(404).json({
        mensaje: "Metodo no obtenidas ",
        status: false,
      });
    }

    return res.status(200).json({
      mensaje: "Metodo obtenidas exitosamente",
      status: true,
      metodoPago: metodoPago,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener los metodo pago",
      status: false,
      error: error.message,
    });
  }
};
module.exports = {
  listarMetodoPago,
};
