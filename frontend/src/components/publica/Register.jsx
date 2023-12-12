import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { form, cambiar } = HelperForm({});
  const [enviaRol] = useState(2);
  const [, setGuardado] = useState("");
  //MENSAJE DE LOS CAMPOS VACIOS
  const mostrarCamposVaciosAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Campos Vacíos ",
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
  //VALIDACION DEL FORMULARIO
  const validarFormulario = () => {
    if (
      !form.apellido ||
      !form.nombre ||
      !form.email ||
      !form.password ||
      !form.ciudad ||
      !form.zonaPostal
    ) {
      console.log(form);
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };
  //BOTON GUARDAR
  const guardarRegistro = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    let nuevoPerfil = { ...form, Rol_idRol: enviaRol };
    console.log(nuevoPerfil);
    try {
      const response = await fetch(Global.url + "usuario/registrando", {
        method: "POST",
        body: JSON.stringify(nuevoPerfil),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === true) {
        //MENSAJE EXITOSO
        setGuardado("Guardado");
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "¡Tu registro se ha completado con éxito!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
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

  return (
    <>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-lg-6 col-12">
          <form
            className="custom-form hero-form"
            action="#"
            method="get"
            role="form"
            onSubmit={guardarRegistro}
          >
            <h3 className="text-white mb-3">Register | Adventures Digitals</h3>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="form-control"
                    placeholder="Nombre"
                    onChange={cambiar}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="apellido"
                    id="apellido"
                    className="form-control"
                    placeholder="Apellido"
                    onChange={cambiar}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    className="form-control"
                    placeholder="Ciudad"
                    onChange={cambiar}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="zonaPostal"
                    id="zonaPostal"
                    className="form-control"
                    placeholder="ZonaPostal"
                    onChange={cambiar}
                    required
                  />
                </div>
              </div>
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
                    onChange={cambiar}
                    required
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
                    onChange={cambiar}
                    required
                  />
                </div>
              </div>
              {/* <input
                type="number"
                name="Rol_idRol"
                id="Rol_idRol"
                defaultValue={2}
                onChange={cambiar}
                hidden
              /> */}
              <div className="col-lg-12 col-12">
                <button type="submit" className="form-control">
                  Registrarse
                </button>
              </div>

              <div className="col-12">
                <div className="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                  <span className="text-white mb-lg-0 mb-md-0 me-2">
                    Puedes Ingresar en :
                  </span>
                  <div>
                    <NavLink to="/">
                      <a href="" className="badge">
                        Login
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

export default Register;
