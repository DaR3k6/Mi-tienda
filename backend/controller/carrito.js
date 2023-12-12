const productoModel = require("../model/Producto");
const detalleModel = require("../model/Detalle");
const facturaModel = require("../model/Factura");
const metodoPago_has_FacturaModel = require("../model/MetodoPagoHas");
const metodoPagoModel = require("../model/MetodoPago");

// CONTROLADOR DE CARRITO DE COMPRAS
// const agregarCarritoCompras = async (req, res) => {
//   try {
//     const { productoId, cantidad, metodoPagoId } = req.body;

//     const productoInfo = await productoModel.findByPk(productoId);

//     if (!productoInfo) {
//       return res
//         .status(404)
//         .json({ mensaje: "Producto no encontrado", status: false });
//     }

//     const [factura, created] = await facturaModel.findOrCreate({
//       where: { estado: 1 },
//     });

//     if (!created) {
//       return res.status(404).json({
//         mensaje: "La factura ya existencia",
//         status: false,
//       });
//     }

//     const metodoPago = await metodoPagoModel.findByPk(metodoPagoId);

//     if (!metodoPago) {
//       return res
//         .status(400)
//         .json({ mensaje: "Método de pago no válido", status: false });
//     }

//     const [detalle, detalleCreated] = await detalleModel.findOrCreate({
//       where: {
//         Producto_idProducto: productoId,
//         Factura_idFactura: factura.idFactura,
//       },
//       defaults: {
//         cantidad,
//         precioUnitario: productoInfo.precio,
//       },
//     });

//     if (!detalleCreated) {
//       return res.status(404).json({
//         mensaje: "El detalle ya existe",
//         status: false,
//       });
//     }

//     // Resta el stock del producto
//     productoInfo.stock -= cantidad;
//     await productoInfo.save();

//     return res.status(200).json({
//       mensaje: "Producto agregado al carrito",
//       status: true,
//       carrito: {
//         factura,
//         detalle,
//         metodoPago,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ mensaje: "Error al agregar al carrito", status: false });
//   }
// };

// CONTROLLADOR PARA OBTENER TODO EL CONTENIDO DEL CARRITO DE COMPRAS
const obtenerCarrito = async (req, res) => {
  try {
    // OBTIENE LA FACTURA ACTUAL CON DETALLES Y MÉTODOS DE PAGO ASOCIADOS
    const factura = await facturaModel.findOne({
      where: {
        estado: 1,
      },
      include: [
        {
          model: detalleModel,
          attributes: ["idDetalle", "cantidad", "precioUnitario"],
          include: [
            {
              model: productoModel,
              attributes: ["idProducto", "nombre", "precio"],
            },
          ],
        },
        {
          model: metodoPagoModel,
          attributes: ["idMetodoPago", "descripcion", "estado"],
          through: {
            model: metodoPago_has_FacturaModel,
          },
        },
      ],
    });

    return res.status(200).json({
      mensaje: "Todo el contenido del carrito de compras",
      status: true,
      carrito: factura,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener el carrito", status: false });
  }
};






// // CONTROLADOR PARA PROCESAR LA COMPRA
// const procesarCompra = async (req, res) => {
//   try {
//     // OBTIENE LA FACTURA ACTUAL Y CAMBIA SU ESTADO A COMPLETADO (2)
//     const factura = await facturaModel.findOne({
//       where: { estado: 1 },
//     });

//     if (!factura) {
//       return res
//         .status(404)
//         .json({ mensaje: "No hay factura en curso", status: false });
//     }

//     //FECHA ACTUAL DE LA FACTURA
//     factura.fecha = new Date();

//     const detallesActuales = await detalleModel.findAll({
//       where: { Factura_idFactura: factura.idFactura },
//     });

//     let total = 0;
//     detallesActuales.forEach(detalle => {
//       total += detalle.cantidad * detalle.precioUnitario;
//     });

//     factura.total = total;

//     factura.estado = 2;
//     await factura.save();

//     // LIMPIA EL CARRITO (ELIMINA DETALLES ASOCIADOS A LA FACTURA)
//     await detalleModel.destroy({
//       where: { Factura_idFactura: factura.idFactura },
//     });

//     res
//       .status(200)
//       .json({ mensaje: "Compra procesada con éxito", carrito: factura });
//   } catch (error) {
//     console.error(error);

//     res
//       .status(500)
//       .json({ mensaje: "Error al procesar la compra", status: false });
//   }
// };

module.exports = { obtenerCarrito };
