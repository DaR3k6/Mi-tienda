//URL DE LA API
export const urlCategoria = "http://localhost:3300/";
const tabla = document.querySelector("#tablaCategoria");

//CREO LA TABLA
fetch(urlCategoria + "categorias")
  .then(response => {
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let fila = ` <tr>
        <td>${data[i].idCategoria}</td>
        <td>${data[i].nombre}</td>
        <td>${data[i].imagen}</td>
        <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#ventanaModal" id=BTNeditar >Editar</button></td>
        <td><button type="button" class="btn btn-danger" id=BTNborrar >Borrar</button></td>
        </tr> `;

      tabla.innerHTML += fila;
    }
  });

//DOM PARA INGRESAR EL FORMULARIO DE LA CATEGORIA
const btnCategoria = document.querySelector("#btnCategoria");

btnCategoria.addEventListener("click", e => {
  e.preventDefault();
  const categoria = {
    nombre: nombreCategoria.value,
    imagen: imagenCategoria.value,
  };
  fetch(urlCategoria + "categorias", {
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
//EDITAR Y BORRAR
