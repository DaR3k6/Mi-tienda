//Modulos requeridos para el proyecto
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre llamadas de sitios
const categoria = express.Router(); //Trae el metodo router de express para hacer los endpoints
const conex = require("./bdatos.js");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //La trae por defecto NODE JS me permite usar async/await opcion a fetch

//Campos de categoria
const campoCategoria = ["nombre", "imagen"];

//Verbo GET LISTAR
categoria.get("/categorias", async (req, res) => {
  try {
    conex.query("SELECT * FROM categoria", (error, result) => {
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//Verbo POST INSERTAR USUARIO
categoria.post("/categorias", async (req, res) => {
  try {
    let data = {};
    campoCategoria.forEach(campo => {
      data[campo] = req.body[campo];
    });
    conex.query("INSERT INTO categoria SET ?", data, (error, respuesta) => {
      console.log(`Categoria registrada correctamente ${respuesta}`);
      res.status(201).send(respuesta);
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = categoria;
