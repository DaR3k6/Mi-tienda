import img from "../../../public/images/five.jpeg";
import img1 from "../../../public/images/geshin.jpeg";
import img2 from "../../../public/images/fornites.jpeg";
import Carrito from "./Carrito";
import Cards from "./Cards";
const Cuerpo = () => {
  return (
    <>
      <main>
        {/* SECCION CARUSEL*/}
        <section className="hero-section d-flex justify-content-center align-items-center">
          <div className="section-overlay"></div>

          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12 mb-5 mb-lg-0">
                <div className="hero-section-text mt-5">
                  <h6 className="text-white">
                    Estas buscando cuentas, para no tener que farmear tu ?
                  </h6>

                  <h1 className="hero-title text-white mt-4 mb-4">
                    Este es el Lugar. <br /> Busca tu cuenta Ahora!
                  </h1>

                  <a
                    href="#categories-section"
                    className="custom-btn custom-border-btn btn"
                  >
                    Ingresar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECCION CATEGORIAS */}
        <section
          className="categories-section section-padding"
          id="categories-section"
        >
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-12 col-12 text-center">
                <h2 className="mb-5">
                  Busca nuestras <span>Categorias</span>
                </h2>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="categories-block">
                  <a
                    href="#"
                    className="d-flex flex-column justify-content-center align-items-center h-100"
                  >
                    <i className="categories-icon bi-window"></i>

                    <small className="categories-block-title">Online</small>

                    <div className="categories-block-number d-flex flex-column justify-content-center align-items-center">
                      <span className="categories-block-number-text">320</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="categories-block">
                  <a
                    href="#"
                    className="d-flex flex-column justify-content-center align-items-center h-100"
                  >
                    <i className="categories-icon bi-twitch"></i>

                    <small className="categories-block-title">Twich</small>

                    <div className="categories-block-number d-flex flex-column justify-content-center align-items-center">
                      <span className="categories-block-number-text">180</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="categories-block">
                  <a
                    href="#"
                    className="d-flex flex-column justify-content-center align-items-center h-100"
                  >
                    <i className="categories-icon bi bi-pc-display-horizontal"></i>

                    <small className="categories-block-title">Pc</small>

                    <div className="categories-block-number d-flex flex-column justify-content-center align-items-center">
                      <span className="categories-block-number-text">340</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="categories-block">
                  <a
                    href="#"
                    className="d-flex flex-column justify-content-center align-items-center h-100"
                  >
                    <i className="categories-icon bi bi-tablet"></i>

                    <small className="categories-block-title">Mobile</small>

                    <div className="categories-block-number d-flex flex-column justify-content-center align-items-center">
                      <span className="categories-block-number-text">140</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <div className="categories-block">
                  <a
                    href="#"
                    className="d-flex flex-column justify-content-center align-items-center h-100"
                  >
                    <i className="categories-icon bi-steam"></i>

                    <small className="categories-block-title">Equipos</small>

                    <div className="categories-block-number d-flex flex-column justify-content-center align-items-center">
                      <span className="categories-block-number-text">84</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECCION CARTELES*/}
        <section className="about-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-12">
                <div className="about-image-wrap custom-border-radius-start">
                  <img
                    src={img}
                    className="about-image custom-border-radius-start img-fluid"
                    alt=""
                  />

                  <div className="about-info">
                    <h4 className="text-white mb-0 me-2">
                      Five Nights Freddys
                    </h4>

                    <p className="text-white mb-0">$35000</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="custom-text-block">
                  <h2 className="text-white mb-2">Bienvenido </h2>

                  <p className="text-white">
                    Bienvenido a Adventures Digitals Aqui prodras encontrar
                    cuentas de toda clase de juegos, en la cual podras hablar
                    con el vendedor y obtener items de cada juego, hasta los mas
                    dificiles y complicados en venta{" "}
                    <a href="https://www.tooplate.com" target="_parent">
                      Visitar referencia
                    </a>
                    . Images de <a target="_blank">Pinteres</a> disfruta.
                  </p>

                  <div className="custom-border-btn-wrap d-flex align-items-center mt-5">
                    <a
                      href="about.html"
                      className="custom-btn custom-border-btn btn me-4"
                    >
                      Acceder
                    </a>

                    <a href="#job-section" className="custom-link smoothscroll">
                      Explorar Contenido
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-12">
                <div className="instagram-block">
                  <img
                    src={img1}
                    className="about-image custom-border-radius-end img-fluid"
                    alt=""
                  />

                  <div className="instagram-block-text">
                    <a
                      href="https://instagram.com/"
                      className="custom-btn btn mt-4"
                    >
                      <i className="bi-instagram"></i>
                      Comprar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECCION CARRITO DE COMPRAS */}
        <Carrito />
        {/* SECCION SOBRE FORNITE */}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="custom-text-block custom-border-radius-start">
                  <h2 className="text-white mb-3">
                    Ahora con todo el pase de batalla de Fornite
                  </h2>

                  <p className="text-white">
                    Puedes encontrar cuentas de fornite desde la primera
                    temporada con emotes y skines exclusivas.!!
                  </p>

                  <div className="d-flex mt-4">
                    <div className="counter-thumb">
                      <div className="d-flex">
                        <span
                          className="counter-number"
                          data-from="1"
                          data-to="12"
                          data-speed="1000"
                        ></span>
                        <span className="counter-number-text">F</span>
                      </div>

                      <span className="counter-text">Frecuente,Fresco</span>
                    </div>

                    <div className="counter-thumb">
                      <div className="d-flex">
                        <span
                          className="counter-number"
                          data-from="1"
                          data-to="450"
                          data-speed="1000"
                        ></span>
                        <span className="counter-number-text">T</span>
                      </div>

                      <span className="counter-text">Temporada,Terror</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="video-thumb">
                  <img
                    src={img2}
                    className="about-image custom-border-radius-end img-fluid"
                    alt=""
                  />

                  <div className="video-info">
                    <a
                      href="https://www.youtube.com//@fortnite"
                      className="youtube-icon bi-youtube"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECCION CARDS PRODUCTOS */}
        <Cards />
      </main>
    </>
  );
};

export default Cuerpo;
