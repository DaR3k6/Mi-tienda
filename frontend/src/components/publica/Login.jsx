import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { Navigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  //REDIRECCIONA
  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  const [navLink, setnavLink] = useState(false);
  //MENSAJE DE LOS CAMPOS VACIOS
  const mostrarCamposVaciosAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Campos Vacíos",
      text: "Por favor complete todos los campos obligatorios.",
    });
  };

  //MENSAJE DE ERROR
  const mostrarErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  //VALIDACION DE LOS CAMPOS VACIOS
  const validarFormulario = () => {
    if (!form.email || !form.password) {
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };

  const guardarLogin = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    let nuevoPerfil = form;

    try {
      const request = await fetch(Global.url + "usuario/login", {
        method: "POST",
        body: JSON.stringify(nuevoPerfil),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.status === true) {
        //VEREFICO SI EL USUARIO EXISTE
        const usuarioExistente = localStorage.getItem("usuario");
        if (usuarioExistente) {
          localStorage.removeItem("usuario");
        }
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        console.log(data.usuario);

        //MENSAJE EXITOSO
        setGuardado("Guardado");
        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: "¡Te logeaste completamente con éxito!",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          setnavLink(true);

          setTimeout(() => {
            window.location.reload();
          });
        });
      } else {
        //MENSAJE DE ERROR
        setGuardado("Error");
        mostrarErrorAlert(data.mensaje);
      }
    } catch (error) {
      //MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  if (navLink) {
    window.location.reload();
    return <Navigate to="/Inicio" />;
  }

  return (
    <>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-lg-6 col-12">
          <form
            className="custom-form hero-form"
            action="#"
            method="get"
            role="form"
            onSubmit={guardarLogin}
          >
            <h3 className="text-white mb-3">Login | Adventures Digitals</h3>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    onChange={cambiar}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="bi-geo-alt custom-icon"></i>
                  </span>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={cambiar}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-12">
                <button type="submit" className="form-control">
                  Ingresar
                </button>
              </div>

              <div className="col-12">
                <div className="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                  <span className="text-white mb-lg-0 mb-md-0 me-2">
                    Puedes Registrarte en :
                  </span>

                  <div>
                    <NavLink to="/Registro">
                      <a href="" className="badge">
                        Registro
                      </a>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
