const urlApi = "http://localhost:3300/";
//Dom
const btnEnviar = document.querySelector("#btnEnviar");

//Evento
btnEnviar.addEventListener("click", e => {
  e.preventDefault();
  let sesion = {
    email: email.value,
    constraseña: constraseña.value,
  };
  fetch(urlApi + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sesion),
  })
    .then(response => {
      return response.text();
    })

    .then(data => {
      if (data === "true") {
        window.location = "http://127.0.0.1:5500/dashboard.html";
      } else {
        Swal.fire({
          icon: "ERROR",
          title: "Falla en la validacion !.",
          text: "La clava o el usuario no conciden",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    });
});
