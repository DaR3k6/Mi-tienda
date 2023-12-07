const categoriaModelo = require("../model/Categoria");

// AGREGAR CATEGORÍA
const agregarCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevaCategoria = await categoriaModelo.create({ nombre });

    if (nuevaCategoria) {
      return res.status(200).json({
        mensaje: "Categoría agregada exitosamente",
        status: true,
        categoria: nuevaCategoria,
      });
    } else {
      return res.status(500).json({
        mensaje: "Error al agregar la categoría",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al agregar la categoría",
      status: false,
      error: error.message,
    });
  }
};

// OBTENER TODAS LAS CATEGORÍAS
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModelo.findAll();

    if (!categorias) {
      return res.status(404).json({
        mensaje: "Categorías no obtenidas ",
        status: false,
      });
    }

    return res.status(200).json({
      mensaje: "Categorías obtenidas exitosamente",
      status: true,
      categorias: categorias,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener las categorías",
      status: false,
      error: error.message,
    });
  }
};

// OBTENER CATEGORÍA POR ID
const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await categoriaModelo.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
        status: false,
      });
    }

    res.status(200).json({
      mensaje: "Categoría obtenida exitosamente",
      status: true,
      categoria: categoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener la categoría",
      status: false,
      error: error.message,
    });
  }
};

// ACTUALIZAR CATEGORÍA POR ID
const actualizarCategoria = async (req, res) => {
  try {
    const id = req.params.id;

    const categoria = await categoriaModelo.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
        status: false,
      });
    }

    const { nombre } = req.body;

    // Actualizar los campos de la categoría
    categoria.nombre = nombre;

    await categoria.save();

    res.status(200).json({
      mensaje: "Categoría actualizada exitosamente",
      status: true,
      categoria: categoria,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al actualizar la categoría",
      status: false,
      error: error.message,
    });
  }
};

// ELIMINAR CATEGORÍA POR ID
const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await categoriaModelo.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
        status: false,
      });
    }

    await categoria.destroy();
    res.status(200).json({
      mensaje: "Categoría eliminada exitosamente",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al eliminar la categoría",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  agregarCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria,
};
