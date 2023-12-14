import { useEffect, useState } from "react";
// import img3 from "../../../public/images/warcraft2.jpeg";
// import img4 from "../../../public/images/lol.jpeg";
// import img5 from "../../../public/images/apex.jpeg";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
const Cards = () => {
  //CAPTURO EL TOKEN
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);
  //CREAMOS ESTADOS PARA TRAER TODOS LOS ESTUDIOS
  const [estado, setEstado] = useState(null);
  const [productos, setProductos] = useState(null);
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

  //TRAE TODOS LOS ESTUDIOS
  const cargarEstudio = async () => {
    fetch(Global.url + "productos/obtener", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userObj.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado(data.status);
        console.log(data.productos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  //cargo estudios al momento de cargar la pagina
  useEffect(() => {
    cargarEstudio();
  }, []);

  return (
    <>
      <section
        className="job-section recent-jobs-section section-padding"
        id="cards"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12 mb-4">
              <h2>Tarjeta de Productos</h2>

              <p>
                <strong>Productos Descuento </strong>.
                <br /> Encuentra aqui todas nuestras cuentas de juegos
                disponibles para que puedas divertirtey presumir con tus amigos.
              </p>
            </div>

            <div className="clearfix"></div>

            {estado == true ? (
              productos.map((producto) => {
                return (
                  <>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="job-thumb job-thumb-box">
                        <div
                          className="job-image-box-wrap"
                          key={producto.idProducto}
                        >
                          <a href="job-details.html">
                            <img
                              src={producto.imagen}
                              className="job-image img-fluid"
                              alt=""
                            />
                          </a>

                          <div className="job-image-box-wrap-info d-flex align-items-center">
                            <p className="mb-0">
                              <a
                                href="job-listings.html"
                                className="badge badge-level"
                              >
                                {producto.marca}
                              </a>
                            </p>

                            <p className="mb-0">
                              <a href="job-listings.html" className="badge">
                                {producto.marca}
                              </a>
                            </p>
                          </div>
                        </div>

                        <div className="job-body">
                          <h4 className="job-title">
                            <a
                              href="job-details.html"
                              className="job-title-link"
                            >
                              {producto.nombre}
                            </a>
                          </h4>

                          <div className="d-flex align-items-center">
                            <div className=" d-flex align-items-center bg-white  mt-2 mb-4">
                              <p className="mb-0">
                                Descripcion: {producto.descripcion}
                              </p>
                            </div>

                            <a
                              href="#"
                              className="bi-bookmark ms-auto me-2"
                            ></a>

                            <a href="#" className="bi-heart"></a>
                          </div>

                          <div className="d-flex align-items-center">
                            <p className="job-location">
                              Stock : <strong>{producto.stock}</strong>
                            </p>

                            <p className="job-date">
                              <i className="custom-icon bi-clock me-1"></i>
                              <strong>
                                {producto.fechaPublicacion.slice(0, 10)}
                              </strong>
                            </p>
                          </div>

                          <div className="d-flex align-items-center border-top pt-3">
                            <p className="job-price mb-0">
                              <i className="custom-icon bi-cash me-1"></i>
                              {producto.precio}K
                            </p>

                            <a
                              href="job-details.html"
                              className="custom-btn btn ms-auto"
                            >
                              Agregar <i className="bi bi-cart-plus"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <h3 className="text-center">
                  Lo siento Por ahora no hay cards 😅
                </h3>
                <p className="text-center">
                  Se actualizara automaticamente la pagina al momento de agregar
                  una.
                </p>
              </>
            )}
            {/*
            <div className="col-lg-4 col-md-6 col-12">
              <div className="job-thumb job-thumb-box">
                <div className="job-image-box-wrap">
                  <a href="job-details.html">
                    <img
                      src={img4}
                      className="job-image img-fluid"
                      alt="marketing assistant"
                    />
                  </a>

                  <div className="job-image-box-wrap-info d-flex align-items-center">
                    <p className="mb-0">
                      <a href="job-listings.html" className="badge badge-level">
                        Lol
                      </a>
                    </p>

                    <p className="mb-0">
                      <a href="job-listings.html" className="badge">
                        Disponible
                      </a>
                    </p>
                  </div>
                </div>

                <div className="job-body">
                  <h4 className="job-title">
                    <a href="job-details.html" className="job-title-link">
                      League of Legends
                    </a>
                  </h4>

                  <div className="d-flex align-items-center">
                    <div className="job-image-wrap d-flex align-items-center bg-white shadow-lg mt-2 mb-4">
                      <img
                        src="images/logos/spotify.png"
                        className="job-image me-3 img-fluid"
                        alt=""
                      />

                      <p className="mb-0">Spotify</p>
                    </div>

                    <a href="#" className="bi-bookmark ms-auto me-2"></a>

                    <a href="#" className="bi-heart"></a>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="job-location">
                      <i className="custom-icon bi-geo-alt me-1"></i>
                      California, USA
                    </p>

                    <p className="job-date">
                      <i className="custom-icon bi-clock me-1"></i>8 days ago
                    </p>
                  </div>

                  <div className="d-flex align-items-center border-top pt-3">
                    <p className="job-price mb-0">
                      <i className="custom-icon bi-cash me-1"></i>
                      $20k
                    </p>

                    <a
                      href="job-details.html"
                      className="custom-btn btn ms-auto"
                    >
                      Apply now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="job-thumb job-thumb-box">
                <div className="job-image-box-wrap">
                  <a href="job-details.html">
                    <img src={img5} className="job-image img-fluid" alt="" />
                  </a>

                  <div className="job-image-box-wrap-info d-flex align-items-center">
                    <p className="mb-0">
                      <a href="job-listings.html" className="badge badge-level">
                        Apex
                      </a>
                    </p>

                    <p className="mb-0">
                      <a href="job-listings.html" className="badge">
                        Disponible
                      </a>
                    </p>
                  </div>
                </div>

                <div className="job-body">
                  <h4 className="job-title">
                    <a href="job-details.html" className="job-title-link">
                      Apex Legends
                    </a>
                  </h4>

                  <div className="d-flex align-items-center">
                    <div className="job-image-wrap d-flex align-items-center bg-white shadow-lg mt-2 mb-4">
                      <img
                        src="images/logos/twitter.png"
                        className="job-image me-3 img-fluid"
                        alt=""
                      />

                      <p className="mb-0">Twiter</p>
                    </div>

                    <a href="#" className="bi-bookmark ms-auto me-2"></a>

                    <a href="#" className="bi-heart"></a>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="job-location">
                      <i className="custom-icon bi-geo-alt me-1"></i>
                      California, USA
                    </p>

                    <p className="job-date">
                      <i className="custom-icon bi-clock me-1"></i>
                      23 hours ago
                    </p>
                  </div>

                  <div className="d-flex align-items-center border-top pt-3">
                    <p className="job-price mb-0">
                      <i className="custom-icon bi-cash me-1"></i>
                      $68k
                    </p>

                    <a
                      href="job-details.html"
                      className="custom-btn btn ms-auto"
                    >
                      Apply now
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cards;
