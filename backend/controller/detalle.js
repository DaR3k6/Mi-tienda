const sequelize = require("../model/Conexion");
const detalleModel = require("../model/Detalle");
const productoModel = require("../model/Producto");

//CONTROLADOR PARA AGREGAR UN DETALLE
const agregarDetalle = async (req, res) => {
  try {
    const maxDetalle = await detalleModel.max("idDetalle");

    const nuevoIdDetalle = maxDetalle ? maxDetalle + 1 : 1;

    const { cantidad, precioUnitario, Factura_idFactura, Producto_idProducto } =
      req.body;

    const nuevoDetalle = await Detalle.create({
      idDetalle: nuevoIdDetalle,
      cantidad,
      precioUnitario,
      Factura_idFactura,
      Producto_idProducto,
    });

    if (nuevoDetalle) {
      res.status(200).json({
        mensaje: "Detalle agregado correctamente",
        status: true,
        detalle: nuevoDetalle,
      });
    } else {
      res.status(400).json({
        mensaje: "Error al agregar el detalle",
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

//CONTROLADOR PARA LISTAR UN DETALLE
const listarDetalle = async (req, res) => {
  try {
    const detalle = await detalleModel.findAll({
      attributes: ["idDetalle", "cantidad", "precioUnitario"],
      include: [
        {
          model: productoModel,
          attributes: ["idProducto", "nombre", "precio"],
          where: {
            idProducto: sequelize.liteal(
              "detalle.Producto_idProducto=producto.idProducto"
            ),
          },
        },
      ],
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

module.exports = {
  agregarDetalle,
  listarDetalle,
};
