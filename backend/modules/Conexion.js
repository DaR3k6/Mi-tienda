const mysql = require("mysql"); 

//Creamos la conexion
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

conexion.connect(error => {
  if (error) {
    console.log(`Hay en un error: ${error}`);
  } else {
    console.log("Conexion Exitosa!");
  }
});

module.exports = conexion;
