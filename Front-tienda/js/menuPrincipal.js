const apiProducto = "http://localhost:3300/productos";

const contenedorPadre = document.querySelector("#contenedorPadre");

fetch(apiProducto)
  .then(response => {
    return response.json();
  })
  .then(data => {
    data.forEach(producto => {
      contenedorPadre.innerHTML += `<div class="card mt-3 col-3 col-md-6 mb-3" style="width: 19rem; height: 20rem;">
        <img class="card-img-top" style="width:18rem" src="${producto.imagen}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <button class="btn btn-danger">Borrar producto</button>
        </div>
      </div>`;
    });

    console.log(data);
  });
