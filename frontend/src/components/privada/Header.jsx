import img from "../../../public/images/logo2.png";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a
            className="navbar-brand d-flex align-items-center"
            href="index.html"
          >
            <img src={img} className="img-fluid logo-image" />

            <div className="d-flex flex-column">
              <strong className="logo-text">Adventures</strong>
              <small className="logo-slogan">Digitals</small>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-center ms-lg-5">
              <li className="nav-item">
                <a className="nav-link active" href="index.html">
                  Inicio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
