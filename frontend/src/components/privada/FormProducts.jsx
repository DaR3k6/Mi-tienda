import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";

const FormProducts = () => {
  const [, setGuardado] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [imagen, setImagen] = useState(null);

  // CAPTURO EL TOKEN
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);

  // MENSAJE DE LOS CAMPOS VACÍOS
  const mostrarCamposVaciosAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Campos Vacíos",
      text: "Por favor complete todos los campos obligatorios.",
    });
  };

  // MENSAJE DE ERROR
  const mostrarErrorAlert = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  // VALIDACION DE LOS CAMPOS VACÍOS
  const validarFormulario = () => {
    if (
      !nombre ||
      !descripcion ||
      !marca ||
      !precio ||
      !stock ||
      !calificacion ||
      !fechaPublicacion
    ) {
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
        console.log("Error al obtener categorías");
      }
      const data = await response.json();
      setCategorias(data.categorias);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  // Espero el cambio del select
  const cambiarSelect = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  // GUARDAR CARDS
  const guardarCards = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("marca", marca);
    formData.append("precio", precio);
    formData.append("stock", stock);
    formData.append("calificacion", calificacion);
    formData.append("fechaPublicacion", fechaPublicacion);
    formData.append("imagen", imagen);
    formData.append("CategoriaIdCategoria", categoriaSeleccionada);

    try {
      const request = await fetch(Global.url + "productos/agregar", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: userObj.token,
        },
      });
      console.log(request);
      const data = await request.json();

      if (data.status === true) {
        // MENSAJE EXITOSO
        console.log(data);
        setGuardado("Guardado");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tu Card ha sido guardada!!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // MENSAJE DE ERROR
        setGuardado("Error");
        mostrarErrorAlert(data.mensaje);
      }
    } catch (error) {
      // MENSAJE SI HAY PROBLEMA DEL SERVIDOR
      mostrarErrorAlert(
        "Algo salió mal. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  useEffect(() => {
    traerCategorias();
  }, []);

  return (
    <>
      <form
        className="custom-form hero-form"
        action=""
        method="post"
        role="form"
        onSubmit={guardarCards}
        encType="multipart/form-data"
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
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
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
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
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
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
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
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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
                value={calificacion}
                onChange={(e) => setCalificacion(e.target.value)}
              >
                <option value="" disabled>
                  Calificacion 1-5
                </option>
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
                value={fechaPublicacion}
                onChange={(e) => setFechaPublicacion(e.target.value)}
                required
              />
            </div>
          </div>
          <input
            className="form-control "
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImageChange}
          />
          <div className="mb-3 mt-3">
            <select
              className="form-control"
              id="Categoria_idCategoria"
              name="Categoria_idCategoria"
              aria-label="Default select example"
              value={categoriaSeleccionada}
              onChange={cambiarSelect}
            >
              <option value="" disabled>
                Selecciona una Categoría
              </option>
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
            <button type="submit" className="form-control">
              Agregar Cards <i className="bi bi-plus-circle"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormProducts;
