import { NavLink } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useState, useEffect } from "react";
import HelperForm from "../../helpers/HelperForm";
import Swal from "sweetalert2";

const DetalleMetodoPago = () => {
  const { form, cambiar } = HelperForm({});
  const [metodoPago, setMetodoPago] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
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

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const metodoPagos = async () => {
    try {
      const metodoPagoResponse = await fetch(Global.url + "metodoPago/listar", {
        method: "GET",
        headers: {
          Authorization: usuario.token,
        },
      });

      const metodoPagoData = await metodoPagoResponse.json();
      setMetodoPago(metodoPagoData.metodoPago);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarCompra = async e => {
    e.preventDefault();

    try {
      const response = await fetch(Global.url + "detalle/agregar", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          cantidad: compra.valorCalculado,
          precioUnitario: compra.valorActual,
          Producto_idProducto: compra.id,
          idMetodoPago: categoriaSeleccionada,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: usuario.token,
        },
      });
      const data = await response.json();
      if (data.status === true) {
        Swal.fire({
          icon: "success",
          title: "Compra exitosa",
          text: "¡Tu compra se ha completado con éxito!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
         
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.mensaje || "Error al procesar la compra",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Algo salió mal. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  };

  useEffect(() => {
    metodoPagos();
  }, []);

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
                      Selecciona el Método de Pago
                    </option>
                    {metodoPago.map(metodoPago => (
                      <option
                        key={metodoPago.idMetodoPago}
                        value={metodoPago.idMetodoPago}
                      >
                        {metodoPago.descripcion}
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
