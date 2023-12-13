import { useEffect, useState } from "react";
import HelperForm from "../../helpers/HelperForm";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";

const FormProducts = () => {
  const { form, cambiar } = HelperForm({});
  const [, setGuardado] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState();
  //CAPTURO EL TOKEN
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);
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
    if (
      !form.nombre ||
      !form.descripcion ||
      !form.marca ||
      !form.precio ||
      !form.stock ||
      !form.calificacion ||
      !form.fechaPublicacion ||
      !form.imagen
    ) {
      console.log(form);
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };

  const traerCategorias = async () => {
    try {
      const response = await fetch(
        Global.url + "productos/categorias/obtener",
        {
          method: "GET",
          headers: {
            Authorization: userObj.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }
      const data = await response.json();
      setCategorias(data.categorias);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };
  //Espero el cambio del select
  const cambiarSelect = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };
  //GUARDAR CARDS
  const guardarCards = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }
    let nuevoProducto = { ...form, idCategoria: categoriaSeleccionada };
    console.log(nuevoProducto);
    try {
      const request = await fetch(Global.url + "productos/agregar", {
        method: "POST",
        body: JSON.stringify(nuevoProducto),
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
          title: "Tu Card ha sido guardada!!",
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

  useEffect(() => {
    traerCategorias();
  }, []);

  //PARTE DE INTERFAZ
  return (
    <>
      <form
        className="custom-form hero-form"
        action="#"
        method="get"
        role="form"
        onSubmit={guardarCards}
      >
        <h3 className="text-white mb-3">Agregar Cards | Adventures Digitals</h3>

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
                name="descripcion"
                id="descripcion"
                className="form-control"
                placeholder="Descripcion"
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
                name="marca"
                id="marca"
                className="form-control"
                placeholder="Marca"
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
                name="precio"
                id="precio"
                className="form-control"
                placeholder="Precio del Producto"
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
                name="stock"
                id="stock"
                className="form-control"
                placeholder="Stock"
                onChange={cambiar}
                required
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-star"></i>
              </span>
              <select
                className="form-control"
                name="calificacion"
                aria-label="Default select example"
                onChange={cambiar}
              >
                <option selected>Calificacion 1-5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon2">
                <i className="bi-geo-alt custom-icon"></i>
              </span>

              <input
                type="date"
                name="fechaPublicacion"
                id="fechaPublicacion"
                className="form-control"
                placeholder="Fecha de Publicacion"
                onChange={cambiar}
                required
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="imagen"
              onChange={cambiar}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              name="Categoria_idCategoria"
              aria-label="Default select example"
              onChange={cambiarSelect}
              value={categoriaSeleccionada}
            >
              <option selected>Selecciona una Categorias</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idCategoria}
                  value={categoria.idCategoria}
                >
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-12 col-12">
            <button type="submit" className="form-control ">
              Agregar Cards <i className="bi bi-plus-circle"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormProducts;
