const productoModel = require("../model/Producto");

let carrito = [];

//CONTROLADOR DE CARRITO DE COMPRAS
const agregarCarritoCompras = async () => {
  try {
    const { productoId, cantidad } = req.body;

    //VEREFICA SI EL PRODUCTO YA ESTA EN EL CARRITO DE COMPRAS
    const productoExsitente = await productoModel.find(
      item => item.productoId === productoId
    );

    if (productoExsitente) {
      //ACTUALIZA LA CANTIDAD
      productoExsitente.cantidad += cantidad;
    } else {
      //OBTENGO LA INFORMACION DESDE LA BASE DE DATOS
      const productoInfo = await productoModel.findByPk(productoId);

      if (!productoInfo) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      carrito.push({
        productoId,
        cantidad,
        nombre: productoInfo.nombre,
        precio: productoInfo.precio,
      });
    }

    res.status(200).json({ mensaje: "Producto agregado al carrito", carrito });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar al carrito" });
  }
};

// Obtener el contenido del carrito
const obtenerCarrito = (req, res) => {
  try {
    res.status(200).json({ carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el carrito" });
  }
};

// Procesar la compra (limpiar el carrito)
const procesarCompra = (req, res) => {
  try {
    // Implementa la lógica para procesar la compra aquí
    // Puedes generar una orden, realizar el pago, actualizar el inventario, etc.

    // Luego, limpia el carrito
    carrito = [];

    res.status(200).json({ mensaje: "Compra procesada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al procesar la compra" });
  }
};

module.exports = { agregarCarritoCompras, obtenerCarrito, procesarCompra };
