import img from "../../../public/images/logo2.png";

const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 mb-3">
              <div className="d-flex align-items-center mb-4">
                <img src={img} className="img-fluid logo-image" />

                <div className="d-flex flex-column">
                  <strong className="logo-text">Adventures</strong>
                  <small className="logo-slogan">Digitals</small>
                </div>
              </div>

              <p className="mb-2">
                <i className="custom-icon bi-globe me-1"></i>

                <a href="#" className="site-footer-link">
                  www.adsoAvdentures.com
                </a>
              </p>

              <p className="mb-2">
                <i className="custom-icon bi-telephone me-1"></i>

                <a href="tel: 305-240-9671" className="site-footer-link">
                  305-240-9671
                </a>
              </p>

              <p>
                <i className="custom-icon bi-envelope me-1"></i>

                <a
                  href="mailto:info@yourgmail.com"
                  className="site-footer-link"
                >
                  berserk@coporal.co
                </a>
              </p>
            </div>

            <div className="col-lg-2 col-md-3 col-6">
              <h6 className="site-footer-title">Equipo Trabajo</h6>

              <ul className="footer-menu">
                <li className="footer-menu-item">
                  <a href="#" className="footer-menu-link">
                    Papucho
                  </a>
                </li>

                <li className="footer-menu-item">
                  <a href="#" className="footer-menu-link">
                    Niko
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-8 col-12 mt-3 mt-lg-0">
              <h6 className="site-footer-title">Actualizaciones</h6>

              <form
                className="custom-form newsletter-form"
                action="#"
                method="post"
                role="form"
              >
                <h6 className="site-footer-title">Obtener Notificaciones</h6>

                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person"></i>
                  </span>

                  <input
                    type="text"
                    name="newsletter-name"
                    id="newsletter-name"
                    className="form-control"
                    placeholder="tucorreo@gmail.com"
                    required
                  />

                  <button type="submit" className="form-control">
                    <i className="bi-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-12 d-flex align-items-center">
                <p className="copyright-text">Copyright © ADSO 2024</p>

                <ul className="footer-menu d-flex">
                  <li className="footer-menu-item">
                    <a href="#" className="footer-menu-link">
                      Politica Privacidad
                    </a>
                  </li>

                  <li className="footer-menu-item">
                    <a href="#" className="footer-menu-link">
                      Terminos
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-5 col-12 mt-2 mt-lg-0">
                <ul className="social-icon">
                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-twitter"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-facebook"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-linkedin"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-instagram"></a>
                  </li>

                  <li className="social-icon-item">
                    <a href="#" className="social-icon-link bi-youtube"></a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-12 mt-2 d-flex align-items-center mt-lg-0">
                <p>
                  Design:{" "}
                  <a className="sponsored-link" rel="sponsored" target="_blank">
                    Berserk | Niko
                  </a>
                </p>
              </div>

              <a
                className="back-top-icon bi-arrow-up smoothscroll d-flex justify-content-center align-items-center"
                href="#top"
              ></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
