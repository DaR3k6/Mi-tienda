const urlRegistro = "http://localhost:3300/";
//Dom
const btnRegistro = document.querySelector("#btnRegistro");

btnRegistro.addEventListener("click", e => {
  e.preventDefault();
  const registro = {
    nombre: nombre.value,
    email: emailRegistro.value,
    constraseña: constraseñaRegistro.value,
    direccion: direccion.value,
    cuidad: cuidad.value,
    zonaPostal: zonaPostal.value,
    telefono: telefono.value,
    esAdmin: esAdmin.value,
  };
  fetch(urlRegistro + "usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registro),
  })
    .then(response => {
      return response.text();
    })
    .then(() => {
      location.reload();
    });
});
