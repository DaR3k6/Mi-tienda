const productosModel = require("../model/Producto");

// AGREGAR PRODUCTO
const agregarProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      marca,
      precio,
      stock,
      calificacion,
      fechaPublicacion,
      CategoriaIdCategoria,
    } = req.body;

    console.log(CategoriaIdCategoria);

    const imagen = req.file ? req.file.filename : null;

    const nuevoProducto = await productosModel.create({
      nombre,
      descripcion,
      marca,
      precio,
      stock,
      calificacion,
      fechaPublicacion,
      imagen,
      Categoria_idCategoria: CategoriaIdCategoria,
    });

    if (nuevoProducto) {
      return res.status(200).json({
        mensaje: "Producto agregado exitosamente",
        status: true,
        producto: nuevoProducto,
      });
    } else {
      return res.status(404).json({
        mensaje: "Error al agregar el producto",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al agregar el producto",
      status: false,
      error: error.message,
    });
  }
};

// OBTENER TODOS LOS PRODUCTOS
const obtenerProductos = async (req, res) => {
  try {
    const productos = await productosModel.findAll();

    if (!productos) {
      return res.status(404).json({
        mensaje: "Productos no encontrados",
        status: false,
      });
    }

    return res.status(200).json({
      mensaje: "Productos obtenidos exitosamente",
      status: true,
      productos: productos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al obtener los productos",
      status: false,
      error: error.message,
    });
  }
};

// OBTENER UN PRODUCTO POR ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await productosModel.findByPk(req.params.id, {});

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
        status: false,
      });
    }

    return res.status(200).json({
      mensaje: "Producto obtenido exitosamente",
      status: true,
      producto: producto,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al obtener el producto",
      status: false,
      error: error.message,
    });
  }
};

// ACTUALIZAR UN PRODUCTO POR ID
const actualizarProducto = async (req, res) => {
  try {
    const producto = await productosModel.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
        status: false,
      });
    }

    const {
      nombre,
      descripcion,
      marca,
      precio,
      stock,
      calificacion,
      fechaPublicacion,
      CategoriaIdCategoria,
    } = req.body;

    // Actualizar los campos del producto
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.marca = marca;
    producto.precio = precio;
    producto.stock = stock;
    producto.calificacion = calificacion;
    producto.fechaPublicacion = fechaPublicacion;
    producto.Categoria_idCategoria = CategoriaIdCategoria;

    // Actualizar la imagen si se proporciona una nueva
    if (req.file) {
      // Guardar la nueva imagen
      producto.imagen = req.file.filename;
    }

    await producto.save();

    res.status(200).json({
      mensaje: "Producto actualizado exitosamente",
      status: true,
      producto: producto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al actualizar el producto",
      status: false,
      error: error.message,
    });
  }
};

// ELIMINAR UN PRODUCTO POR ID
const eliminarProducto = async (req, res) => {
  try {
    const producto = await productosModel.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
        status: false,
      });
    }

    await producto.destroy();

    return res.status(200).json({
      mensaje: "Producto eliminado exitosamente",
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al eliminar el producto",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  agregarProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
};
