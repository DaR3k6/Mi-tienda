//Modulos requeridos para el proyecto

const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre llamadas de sitios
const producto = express.Router(); //Trae el metodo router de express para hacer los endpoints
const conex = require("./bdatos.js");

//Construimos la capa intermedia de la aplicacion MIDDLEWARE
producto.use(express.json()); //Serializa la data en JSON
producto.use(cors()); //Permite el acceso de otras direciones IP distintas a mi servicio
producto.options("*", cors()); //Configura las IP admitidas por cors, * significa que las acepta todas

//Codificamos los verbos HTTP (CRUD tipico)
const camposProducto = [
  "nombre",
  "descripcion",
  "categoria",
  "imagen",
  "imagenes",
  "marca",
  "precio",
  "stock",
  "calificacion",
  "estado",
  "fechaCreacion",
];
//Verbo GET LISTAR
producto.get("/productos", (req, res) => {
  conex.query("SELECT * FROM producto", (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});
//Verbo POST INSERTAR
producto.post("/productos", (req, res) => {
  let data = {};
  camposProducto.forEach(campo => {
    data[campo] = req.body[campo];
  });
  conex.query("INSERT INTO producto SET ?", data, (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});
//Verbo PUT ACUTALIZAR
producto.put("/productos/:idProducto", (req, res) => {
  let id = req.params.idProducto;
  let data = {};
  camposProducto.forEach(campo => {
    if (req.body[campo]) {
      data[campo] = req.body[campo];
    }
  });
  conex.query(
    "UPDATE producto SET ? WHERE idProducto = ?",
    [data, id],
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});
//Verbo DELETE ELIMINAR
producto.delete("/productos/:idProducto", (req, res) => {
  let id = req.params.idProducto;
  conex.query(
    "DELETE FROM producto WHERE idProducto = ?",
    id,
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});

module.exports = producto;
