const e = require("express");

const api = "http://localhost:3300/usuarios";
//Boton
const btnRegistrarse = document.querySelector("#btnRegistrarse");

btnRegistrarse.addEventListener("click", e => {
  e.preventDefault();
  const usuario = {
    nombre: nombreInput.value,
    email: correoInput.value,
    constraseña: contraseñaInput.value,
    direccion: direccionInput.value,
    cuidad: cuidadInput.value,
    zonaPostal: zonaInput.value,
    telefono: telefonoInput.value,
    esAdmin: roles.value,
  };

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  })
    .then(response => {
      return response.json();
    })
    .then(() => {
      location.reload();
    });
});
