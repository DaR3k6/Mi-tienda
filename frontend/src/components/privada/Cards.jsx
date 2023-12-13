import img3 from "../../../public/images/warcraft2.jpeg";
import img4 from "../../../public/images/lol.jpeg";
import img5 from "../../../public/images/apex.jpeg";

const Cards = () => {
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

            <div className="col-lg-4 col-md-6 col-12">
              <div className="job-thumb job-thumb-box">
                <div className="job-image-box-wrap">
                  <a href="job-details.html">
                    <img src={img3} className="job-image img-fluid" alt="" />
                  </a>

                  <div className="job-image-box-wrap-info d-flex align-items-center">
                    <p className="mb-0">
                      <a href="job-listings.html" className="badge badge-level">
                        Internacional
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
                      Warcraft
                    </a>
                  </h4>

                  <div className="d-flex align-items-center">
                    <div className="job-image-wrap d-flex align-items-center bg-white shadow-lg mt-2 mb-4">
                      <img
                        src="images/logos/salesforce.png"
                        className="job-image me-3 img-fluid"
                        alt=""
                      />

                      <p className="mb-0">Salesforce</p>
                    </div>

                    <a href="#" className="bi-bookmark ms-auto me-2"></a>

                    <a href="#" className="bi-heart"></a>
                  </div>

                  <div className="d-flex align-items-center">
                    <p className="job-location">
                      <i className="custom-icon bi-geo-alt me-1"></i>
                      Kuala, Malaysia
                    </p>

                    <p className="job-date">
                      <i className="custom-icon bi-clock me-1"></i>
                      10 hours ago
                    </p>
                  </div>

                  <div className="d-flex align-items-center border-top pt-3">
                    <p className="job-price mb-0">
                      <i className="custom-icon bi-cash me-1"></i>
                      $50k
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
            </div>

            <div className="col-lg-4 col-12 recent-jobs-bottom d-flex ms-auto my-4">
              <a href="job-listings.html" className="custom-btn btn ms-lg-auto">
                Agregar
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cards;
