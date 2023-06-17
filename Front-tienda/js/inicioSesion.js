const apiIniciar = "http://localhost:3300/login";
//Conectar inicio
const btnInicarSesion = document.querySelector("#btnInicarSesion");

btnInicarSesion.addEventListener("click", e => {
  e.preventDefault();
  const iniciar = {
    email: correoInput.value,
    constraseña: contraseñaInput.value,
  };

  fetch(apiIniciar, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(iniciar),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (!data) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data,
          footer: '<a href="">¿Por qué tengo este problema?</a>',
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "¡Felicidades!",
          text: "Inicio de sesión correcto",
          footer: '<a href="">¿Por qué tengo este problema?</a>',
        });
      }
      console.log("Datos insertados" + data);
    });
});
