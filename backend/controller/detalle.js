const sequelize = require("../model/Conexion");
const detalleModel = require("../model/Detalle");
const productoModel = require("../model/Producto");
const facturaModel = require("../model/Factura");
const metodoPago_has_FacturaModel = require("../model/MetodoPagoHas");

// CONTROLADOR PARA AGREGAR UN DETALLE
const agregarDetalle = async (req, res) => {
  try {
    const { cantidad, precioUnitario, Producto_idProducto, idMetodoPago } =
      req.body;

    // VALIDACIONES DE ENTRADA
    if (
      !cantidad ||
      cantidad <= 0 ||
      !precioUnitario ||
      precioUnitario <= 0 ||
      !Producto_idProducto ||
      !idMetodoPago
    ) {
      return res.status(400).json({
        mensaje: "Por favor, proporcione datos válidos para la compra",
        status: false,
      });
    }

    // VEREFICA SI EL PRODUCTO EXISTE
    const producto = await productoModel.findByPk(Producto_idProducto);
    if (!producto) {
      return res.status(404).json({
        mensaje: "El producto seleccionado no existe",
        status: false,
      });
    }

    // VEREFICA SI HAY SUFICIENTE STOCK
    if (producto.stock < cantidad) {
      return res.status(400).json({
        mensaje: "No hay suficiente stock para realizar la compra",
        status: false,
      });
    }

    // OBTIENE EL MAXIMO ID DEL DETALLE
    const maxIdDetalle = await detalleModel.max("idDetalle");
    const nuevoIdDetalle = maxIdDetalle ? maxIdDetalle + 1 : 1;

    // CREA LA FACTURA CON EL NUEVO METODO DE PAGO
    const nuevaFactura = await facturaModel.create({
      fecha: new Date(),
      total: 0,
      estado: 0,
    });

    // CREA EL DETALLE ASOCIADO CON LA FACTURA
    const nuevoDetalle = await detalleModel.create({
      idDetalle: nuevoIdDetalle,
      cantidad,
      precioUnitario,
      Producto_idProducto,
      Factura_idFactura: nuevaFactura.idFactura,
    });

    // ACTUALIZO EL NUEVO TOTAL DEL DETALLE CON LA FACTURA
    nuevaFactura.total += cantidad * precioUnitario;
    await nuevaFactura.save();

    // RELACIONO CON EL METODO DE PAGO DEL DETALLE
    await metodoPago_has_FacturaModel.create({
      MetodoPago_idMetodoPago: idMetodoPago,
      Factura_idFactura: nuevaFactura.idFactura,
    });

    // RESTO LA CANTIDAD DEL STOCK DEL PRODUCTO
    producto.stock -= cantidad;
    await producto.save();

    return res.status(200).json({
      mensaje: "Compra realizada con éxito",
      status: true,
      factura: nuevaFactura,
      detalle: nuevoDetalle,
      maxIdDetalle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al realizar la compra",
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
            idProducto: sequelize.literal(
              "detalle.Producto_idProducto=producto.idProducto"
            ),
          },
        },
        {
          model: facturaModel,
          attributes: ["idFactura", "fecha", "total", "estado"],
        },
      ],
    });

    res.status(200).json({
      mensaje: "Detalle listado correctamente",
      status: true,
      detalle: detalle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al listar el detalle",
      status: false,
      error: error.message,
    });
  }
};

//CONTROLADOR PARA ELIMINAR UN DETALLE
const eliminarDetalle = async (req, res) => {
  try {
    const idDetalle = req.params.id;

    // VEREFICA SI EXISTE EL DETALLE
    const detalleExistente = await detalleModel.findByPk(idDetalle);
    if (!detalleExistente) {
      return res.status(404).json({
        mensaje: "Detalle no encontrado",
        status: false,
      });
    }

    // Obtener la factura asociada al detalle antes de eliminarlo
    const facturaAsociada = await facturaModel.findByPk(
      detalleExistente.Factura_idFactura
    );

    // Eliminar el detalle
    await detalleExistente.destroy();

    // Actualizar el total de la factura después de eliminar el detalle
    if (facturaAsociada) {
      const detallesFactura = await detalleModel.findAll({
        where: { Factura_idFactura: facturaAsociada.idFactura },
        attributes: ["cantidad", "precioUnitario"],
      });

      // Calcular el nuevo total de la factura
      let nuevoTotal = 0;
      detallesFactura.forEach(detalle => {
        nuevoTotal += detalle.cantidad * detalle.precioUnitario;
      });

      // Actualizar el total en la factura
      facturaAsociada.total = nuevoTotal;
      await facturaAsociada.save();
    }

    return res.status(200).json({
      mensaje: "Detalle eliminado correctamente",
      status: true,
      detalle: detalleExistente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al eliminar el detalle",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  agregarDetalle,
  listarDetalle,
  eliminarDetalle,
};
