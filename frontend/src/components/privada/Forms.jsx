import { useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
import FormProducts from "./FormProducts";
const Forms = () => {
  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  //CAPTURO EL TOKEN
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);
  console.log(userObj.token);
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
    if (!form.nombre) {
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };

  //GUARDA CATEGORIA
  const guardarCategorias = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    let nuevaCategoria = form;

    try {
      const request = await fetch(Global.url + "productos/categorias/agregar", {
        method: "POST",
        body: JSON.stringify(nuevaCategoria),
        headers: {
          Authorization: userObj.token,
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.status === true) {
        //MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tu categoria ha sido guardada!!",
          showConfirmButton: false,
          timer: 1500,
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
      <div className="container-fluid mt-5">
        <div className="row">
          <h1 className="text-center">Formularios Admin</h1>
          <div className="col-6">
            <FormProducts />
          </div>
          <div className="col-6">
            <form
              className="custom-form hero-form"
              action="#"
              method="get"
              role="form"
              onSubmit={guardarCategorias}
            >
              <h3 className="text-white mb-3">
                Agregar Categoria | Adventures Digitals
              </h3>

              <div className="col-lg-10 col-md-10 col-12 text-center">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="form-control"
                    placeholder="Nombre de la Categoria"
                    onChange={cambiar}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-12">
                <button type="submit" className="form-control">
                  Agregar Categoria <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
