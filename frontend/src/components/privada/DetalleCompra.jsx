import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

const DetalleCompra = () => {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [valorProd, setvalorProd] = useState();
  const [stockProd, setstockProd] = useState(null);
  const [valorActual, setValorActual] = useState(null);
  const [valorCalculado, setValorCalculado] = useState(0);

  // CAPTURO EL TOKEN
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);

  //TRAIGO EL PRODUCTO CON SU RESPECTIVO ID
  const productoId = async () => {
    try {
      const productoUnico = await fetch(
        Global.url + `productos/obtener/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: userObj.token,
          },
        }
      );
      const productoData = await productoUnico.json();
      setProducto(productoData.producto);
      setvalorProd(productoData.producto.precio);
      setstockProd(productoData.producto.stock);
      console.log("Valor Prodc : ", valorProd);
      //VEREFICO SI EXISTE LA CATEOGIRA JUNTO CON EL PRODUCTO
      if (
        productoData.producto &&
        productoData.producto.Categoria_idCategoria
      ) {
        const categoriaUnica = await fetch(
          Global.url +
            `productos/categorias/obtener/${productoData.producto.Categoria_idCategoria}`,
          {
            method: "GET",
            headers: {
              Authorization: userObj.token,
            },
          }
        );
        const categoriaData = await categoriaUnica.json();
        setCategoria(categoriaData.categoria);
      }
    } catch (error) {}
  };

  const capturarCantidad = e => {
    const valorIngresado = parseInt(e.target.value);
    const cantidadMaxima = stockProd;

    // Validar si el valor ingresado es un número y es menor o igual a la cantidad máxima
    if (
      !isNaN(valorIngresado) &&
      valorIngresado > 0 &&
      valorIngresado <= cantidadMaxima
    ) {
      setValorCalculado(valorIngresado);
    } else {
      // El valor ingresado no es válido, ajusta el valor al máximo permitido (stockProd)
      e.target.value = isNaN(valorIngresado) ? "" : cantidadMaxima;
    }
  };

  const CalcularTotal = () => {
    let valores = valorProd * valorCalculado;
    setValorActual(valores);
  };
  useEffect(() => {
    productoId();
    CalcularTotal();
  }, [id, valorProd, stockProd, valorCalculado]);

  const guardarEnLocalStorage = () => {
    const datos = {
      valorProd,
      stockProd,
      valorCalculado,
      valorActual,
      id,
    };

    // Convertir los datos a cadena JSON y guardar en localStorage
    localStorage.setItem("compra", JSON.stringify(datos));
  };

  useEffect(() => {
    guardarEnLocalStorage();
  }, [valorProd, stockProd, valorCalculado, valorActual, id]);
  return (
    <>
      <div className="container-fluid">
        <div
          className="row"
          style={{
            display: "flex",
            placeItems: "center",
            height: "100vh",
            margin: 0,
          }}
        >
          <div className="col-8">
            <div className="row d-flex justify-content-center mt-5">
              <div className="col-lg-6 col-12">
                <form className="custom-form hero-form">
                  <h3 className="text-white mb-3">Detalles | Producto</h3>

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
                          value={`${
                            valorProd !== null ? valorProd : ""
                          } - Valor Producto`}
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
                          value={`${
                            stockProd !== null ? stockProd : ""
                          } - Stock Producto`}
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
                          placeholder="cantidad"
                          onChange={capturarCantidad}
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
                          value={`${valorActual} - Total`}
                          disabled
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-12">
                      <NavLink to="/Inicio/DetalleMetodoPago">
                        <button type="submit" className="form-control">
                          Comprar
                        </button>
                      </NavLink>
                    </div>

                    <div className="col-12">
                      <div className="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                        <span className="text-white mb-lg-0 mb-md-0 me-2">
                          Volver al Inicio:
                        </span>
                        <div>
                          <NavLink to="/">
                            <a href="" className="badge">
                              Volver
                            </a>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-4" style={{ marginLeft: "-10%" }}>
            <div
              className="col-lg-12 col-12"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <div className="job-thumb d-flex">
                <div className="job-image-wrap bg-white shadow-lg">
                  <img
                    src={producto?.imagen}
                    className="job-image img-fluid"
                    alt=""
                  />
                </div>
                <div className="job-body d-flex flex-wrap flex-auto align-items-center ms-4">
                  <div className="mb-3">
                    <h4 className="job-title mb-lg-0">{}</h4>
                    <div className="d-flex flex-wrap align-items-center">
                      <p className="job-location mb-0">
                        <i className="custom-icon bi-geo-alt me-1"></i>
                        {producto?.marca}
                      </p>
                      <p className="job-date mb-0">
                        <i className="custom-icon bi-clock me-1"></i>
                        {producto?.fechaPublicacion.slice(0, 10)}
                      </p>
                      <p className="job-price mb-0">
                        <i className="custom-icon bi-cash me-1"></i>
                        {producto?.precio}K
                      </p>
                      <div className="d-flex">
                        <p className="mb-0">
                          <a
                            href="job-listings.html"
                            className="badge badge-level"
                          ></a>
                        </p>
                        <p className="mb-0">
                          <a href="#" className="badge">
                            {categoria?.nombre}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetalleCompra;
