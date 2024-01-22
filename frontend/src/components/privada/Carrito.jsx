import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Carrito = ({ cartItems }) => {
  const [, setCartItems] = useState([]);

  // Cargar carrito desde el localStorage al montar el componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    const initialCart = cartItems.length > 0 ? cartItems : storedCart;

    setCartItems(initialCart);
    localStorage.setItem("carrito", JSON.stringify(initialCart));
  }, [cartItems]);

  // Función para eliminar un producto del carrito por su idProducto
  const eliminarProductoDelCarrito = idProducto => {
    // Filtra los productos, excluyendo aquellos con el idProducto dado
    const nuevosProductos = cartItems.filter(
      producto => producto.idProducto !== idProducto
    );

    // Guarda los nuevos productos en el localStorage y actualiza el estado del carrito
    localStorage.setItem("carrito", JSON.stringify(nuevosProductos));
    setCartItems(nuevosProductos);
  };
  return (
    <>
      <section
        className="job-section job-featured-section section-padding"
        id="job-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 text-center mx-auto mb-4">
              <h2>
                Carrito de Compras <i className="bi bi-cart-plus"></i>
              </h2>
              <p>
                <strong>Se agregarán</strong> Tus Cards de compras realizadas,
                para que tengas una visión en general.
              </p>
            </div>
            {cartItems.length === 0 ? (
              <>
                <h3 className="text-center">Aun no has comprado nada 😅</h3>
                <p className="text-center">
                  Se comenzará a agregar productos cuando compres.
                </p>
              </>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="col-lg-12 col-12">
                  <div className="job-thumb d-flex">
                    <div className="job-image-wrap bg-white shadow-lg">
                      <img
                        src={item.imagen}
                        className="job-image img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="job-body d-flex flex-wrap flex-auto align-items-center ms-4">
                      <div className="mb-3">
                        <h4 className="job-title mb-lg-0">
                          <a href="job-details.html" className="job-title-link">
                            {item.nombre}
                          </a>
                        </h4>
                        <div className="d-flex flex-wrap align-items-center">
                          <p className="job-location mb-0">
                            <i className="custom-icon bi-geo-alt me-1"></i>
                            {item.marca}
                          </p>
                          <p className="job-date mb-0">
                            <i className="custom-icon bi-clock me-1"></i>
                            {item.fechaPublicacion.slice(0, 10)}
                          </p>
                          <p className="job-price mb-0">
                            <i className="custom-icon bi-cash me-1"></i>
                            {item.precio}K
                          </p>
                          <div className="d-flex">
                            <p className="mb-0">
                              <a
                                href="job-listings.html"
                                className="badge badge-level"
                              >
                                {item.descripcion}
                              </a>
                            </p>
                            <p className="mb-0">
                              <a href="job-listings.html" className="badge">
                                Digital
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="job-section-btn-wrap">
                        <NavLink
                          to={{
                            pathname: "DetalleCompra",
                            state: { cartItem: item },
                          }}
                          className="custom-btn btn"
                        >
                          Aplicar ahora
                        </NavLink>
                        <a
                          href=""
                          className="custom-btn btn m-3"
                          onClick={() =>
                            eliminarProductoDelCarrito(item.idProducto)
                          }
                        >
                          Cancelar Ahora
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Carrito;
