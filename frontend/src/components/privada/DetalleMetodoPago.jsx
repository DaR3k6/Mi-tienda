import { NavLink, useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useState, useEffect } from "react";
import HelperForm from "../../helpers/HelperForm";
import Swal from "sweetalert2";

const DetalleMetodoPago = () => {
  const navigate = useNavigate();
  const { form, cambiar } = HelperForm({});
  const [metodoPago, setMetodoPago] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [, setGuardado] = useState("");
  const [compra, setCompra] = useState({
    valorProd: "",
    stockProd: "",
    valorCalculado: "",
    valorActual: "",
    id: "",
  });

  const cambiarSelect = e => {
    setCategoriaSeleccionada(e.target.value);
  };

  // CAPTURO EL TOKEN
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
  const mostrarErrorAlert = message => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  //VALIDACION DE LOS CAMPOS VACIOS
  const validarFormulario = () => {
    if (
      !compra.valorCalculado ||
      !compra.valorActual ||
      !compra.id ||
      !categoriaSeleccionada
    ) {
      mostrarCamposVaciosAlert();
      return false;
    }
    return true;
  };

  const metodoPagos = async () => {
    try {
      const metodoPago = await fetch(Global.url + "metodoPago/listar", {
        method: "GET",
        headers: {
          Authorization: userObj.token,
        },
      });

      const metodoPagoData = await metodoPago.json();
      setMetodoPago(metodoPagoData.metodoPago);
    } catch (error) {
      console.error(error);
    }
  };

  const removerCarrito = idProducto => {
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    // Filtrar el producto que se quiere eliminar del carrito
    const nuevoCarrito = carrito.filter(
      producto => producto.idProducto !== parseInt(idProducto)
    );

    // Verificar si el producto se encontró y fue eliminado
    if (nuevoCarrito.length < carrito.length) {
      // Actualizar el estado del carrito con los productos restantes
      setCompra(nuevoCarrito);

      // Actualizar el localStorage con el nuevo estado del carrito
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    } else {
      console.log("El producto no se encontró en el carrito.");
    }
  };

  const agregarCompra = async e => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }
    let compraCorrecta = {
      cantidad: compra.valorCalculado,
      precioUnitario: compra.valorActual,
      Producto_idProducto: compra.id,
      idMetodoPago: categoriaSeleccionada,
    };
    console.log(compraCorrecta);
    try {
      const response = await fetch(Global.url + "detalle/agregar", {
        method: "POST",
        body: JSON.stringify(compraCorrecta),
        headers: {
          "Content-Type": "application/json",
          Authorization: userObj.token,
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      console.log(data.status);
      if (data.status === true) {
        //MENSAJE EXITOSO
        setGuardado("Guardado");
        Swal.fire({
          icon: "success",
          title: "Compra exitoso",
          text: "¡Tu compra se ha completado con éxito!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/Inicio");
          localStorage.removeItem("compra");
          removerCarrito(compra.id);
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
    metodoPagos();
  }, []);

  // CAPTURO LOS DATOS DE COMPRA DEL LOCAL STORAGE
  useEffect(() => {
    const compraData = localStorage.getItem("compra");
    const compraObj = JSON.parse(compraData);
    if (compraObj) {
      setCompra(compraObj);
    }
  }, []);

  return (
    <div className="col-8">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-lg-6 col-12">
          <form className="custom-form hero-form" onSubmit={agregarCompra}>
            <h3 className="text-white mb-3">Detalles | Compra</h3>

            <div className="row">
              <div className="col-lg-12"></div>
              <div className="col-lg-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    className="form-control"
                    placeholder="Cantidad"
                    value={`Cantidad: ${compra.valorCalculado}`}
                    onChange={cambiar}
                    disabled
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <select
                    className="form-control"
                    id="idMetodoPago"
                    name="idMetodoPago"
                    aria-label="Default select example"
                    value={categoriaSeleccionada}
                    onChange={cambiarSelect}
                  >
                    <option value="" disabled>
                      Selecciona el Metodo Pago
                    </option>
                    {metodoPago.map(metodoPagos => (
                      <option
                        key={metodoPagos.idMetodoPago}
                        value={metodoPagos.idMetodoPago}
                      >
                        {metodoPagos.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="precioUnitario"
                    id="precioUnitario"
                    className="form-control"
                    placeholder="Valor Total"
                    value={`$${compra.valorActual}`}
                    onChange={cambiar}
                    disabled
                    required
                  />
                </div>
              </div>

              <input
                type="text"
                name="Producto_idProducto"
                id="Producto_idProducto"
                className="form-control"
                placeholder="id"
                onChange={cambiar}
                value={`${compra.id}`}
                disabled
                required
                hidden
              />

              <div className="col-lg-12 col-12">
                <button type="submit" className="form-control">
                  Comprar
                </button>
              </div>

              <div className="col-12">
                <div className="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                  <span className="text-white mb-lg-0 mb-md-0 me-2">
                    Volver al Inicio:
                  </span>
                  <div>
                    <NavLink to="/" className="badge">
                      Volver
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetalleMetodoPago;
