import { NavLink } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useState, useEffect } from "react";

const DetalleMetodoPago = () => {
  const [metodoPago, setMetodoPago] = useState([]);
  const [compra, setCompra] = useState({
    valorProd: "",
    stockProd: "",
    valorCalculado: "",
    valorActual: "",
    id: "",
  });

  // CAPTURO EL TOKEN
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);

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
          <form className="custom-form hero-form">
            <h3 className="text-white mb-3">Detalles | Compra</h3>

            <div className="row">
              <div className="col-lg-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="valor"
                    id="valor"
                    className="form-control"
                    placeholder="valor"
                    value={`$${compra.valorProd}`}
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

                  <input
                    type="text"
                    name="stock"
                    id="stock"
                    className="form-control"
                    placeholder="Stock"
                    value={`${compra.stockProd}`}
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

                  <input
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    className="form-control"
                    value={`${compra.stockProd}`}
                    placeholder="cantidad"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="valorA"
                    id="valorA"
                    className="form-control"
                    placeholder="valorA"
                    disabled
                    required
                  />
                </div>
              </div>
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
