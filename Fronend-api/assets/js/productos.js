//URL DE LA API
const urlProductos = "http://localhost:3300/";
const tablaProductos = document.querySelector("#tablaProductos");

//CREO LA TABLA
fetch(urlProductos + "productos")
  .then(response => {
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let fila = ` <tr>
        <td>${data[i].idCategoria}</td>
        <td>${data[i].nombre}</td>
       
        <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ventanaModal" id=BTNeditar >Editar</button></td>
        <td><button type="button" class="btn btn-danger" id=BTNborrar >Borrar</button></td>
        </tr> `;

      tablaProductos.innerHTML += fila;
    }
  });

//LLENO EL COMBO BOX
import { urlCategoria } from "./categoria.js";

fetch(urlCategoria)
  .then(response => response.json())
  .then(data => console.log(data));

//DOM PARA INGRESAR EL FORMULARIO DE LA CATEGORIA
const btnProducto = document.querySelector("#btnProducto");

btnProducto.addEventListener("click", e => {
  e.preventDefault();
  const categoria = {
    nombre: nombreCategoria.value,
    imagen: imagenCategoria.value,
  };
  fetch(urlProductos + "productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      location.reload();
    });
});
