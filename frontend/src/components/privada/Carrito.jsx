import React, { useEffect, useState } from "react";
const Carrito = ({ cartItems }) => {
  console.log(cartItems);
  const [, setCarrito] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("productos")) || [];
    const initialCart = cartItems.length > 0 ? cartItems : storedCart;

    console.log(storedCart);

    setCarrito(initialCart);
    localStorage.setItem("productos", JSON.stringify(initialCart));
  }, [cartItems]);

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
                            {item.fechaPublicacion}
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
                                Internship
                              </a>
                            </p>
                            <p className="mb-0">
                              <a href="job-listings.html" className="badge">
                                Freelance
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="job-section-btn-wrap">
                        <a href="job-details.html" className="custom-btn btn">
                          Aplicar ahora
                        </a>
                        <a href="job-details.html" className="custom-btn btn">
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
