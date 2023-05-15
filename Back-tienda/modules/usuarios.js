//Modulos requeridos para el proyecto

const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); //Trae el metodo router de express para hacer los endpoints
const conex = require("./bdatos.js");

//Construimos la capa intermedia de la aplicacion MIDDLEWARE
usuario.use(express.json()); //Serializa la data en JSON
usuario.use(cors()); //Permite el acceso de otras direciones IP distintas a mi servicio
usuario.options("*", cors()); //Configura las IP admitidas por cors, * significa que las acepta todas

//Codificamos los verbos HTTP (CRUD tipico)

//Verbo GET LISTAR
usuario.get("/usuarios", (req, res) => {
  conex.query("SELECT * FROM usuario", (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});

//Verbo POST INSERTAR
usuario.post("/usuarios", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    constraseña: req.body.constraseña,
    direccion: req.body.direccion,
    cuidad: req.body.cuidad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  conex.query("INSERT INTO usuario SET ?", data, (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//Verbo PUT ACUTALIZAR
usuario.put("/usuarios/:idUsuario", (req, res) => {
  let id = req.params.idUsuario;
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    constraseña: req.body.constraseña,
    direccion: req.body.direccion,
    cuidad: req.body.cuidad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  conex.query(
    "UPDATE usuario SET ? WHERE idUsuario = ?",
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
usuario.delete("/usuarios/:idUsuario", (req, res) => {
  let id = req.params.idUsuario;
  conex.query("DELETE FROM usuario WHERE idUsuario = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
      }
    };
});

module.exports = usuario;
