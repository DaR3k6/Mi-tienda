//CONFIGURO LOS ROUTERS
const express = require("express");
const router = express.Router();
const auth = require("../helpers/jwt");
const multer = require("multer");
const productosController = require("../controller/productos");
const categoriasController = require("../controller/categoria");

// Configuración de Multer para la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//RUTA PARA TODOS LOS PRODUCTOS
router.post(
  "/agregar",
  auth,
  upload.single("imagen"),
  productosController.agregarProducto
);
router.get("/obtener", auth, productosController.obtenerProductos);

router.get("/obtener/:id", auth, productosController.obtenerProductoPorId);
router.put(
  "/actualizar/:id",
  auth,
  upload.single("imagen"),
  productosController.actualizarProducto
);
router.delete("/eliminar/:id", auth, productosController.eliminarProducto);
router.get("/paginacion/:pagina?", productosController.paginacionProducto);

//RUTA PARA TODAS LAS CATEGORIAS
router.post("/categorias/agregar", auth, categoriasController.agregarCategoria);
router.get("/categorias/obtener", auth, categoriasController.obtenerCategorias);
router.get(
  "/categorias/obtener/:id",
  auth,
  categoriasController.obtenerCategoriaPorId
);
router.put(
  "/categorias/actualizar/:id",
  auth,
  categoriasController.actualizarCategoria
);
router.delete(
  "/categorias/eliminar/:id",
  auth,
  categoriasController.eliminarCategoria
);

module.exports = router;
