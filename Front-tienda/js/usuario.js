const api = "http://localhost:3300/usuarios";
//Botones
const btnRegistrarse = document.querySelector("#btnRegistrarse");
//Inputs
const nombreInput = document.querySelector("#nombreInput");
const correoInput = document.querySelector("#correoInput");
const contraseñaInput = document.querySelector("#contraseñaInput");
const direccionInput = document.querySelector("#direccionInput");
const cuidadInput = document.querySelector("#cuidadInput");
const zonaInput = document.querySelector("#zonaInput");
const telefonoInput = document.querySelector("#telefonoInput");
const roles = document.querySelector("#roles");

btnRegistrarse.addEventListener("click", () => {
  const valores = {
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
    body: JSON.stringify(valores),
  })
    .then(response => {
      if (response.status === 201) {
        console.log("Ya se registro en la base de datos");
      }
      if (response.status === 404) {
        console.log("Error en la conexion");
      }
      return response.json();
    })
    .then(data => {
      console.log(`La respuesta del servido es OK ${data}`);
    });
});
