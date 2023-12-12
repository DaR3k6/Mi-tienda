import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirecciona a la ruta deseada
    navigate("/");
  };
  return (
    <>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-lg-6 col-12">
          <form
            className="custom-form hero-form"
            action="#"
            method="get"
            role="form"
          >
            <h3 className="text-white mb-3">Register | Adventures Digitals</h3>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    className="form-control"
                    placeholder="Nombre"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="job-title"
                    id="job-title"
                    className="form-control"
                    placeholder="Apellido"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="ciudad"
                    id="job-title"
                    className="form-control"
                    placeholder="Ciudad"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="text"
                    name="zonaPostal"
                    id="job-title"
                    className="form-control"
                    placeholder="ZonaPostal"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-person custom-icon"></i>
                  </span>

                  <input
                    type="email"
                    name="job-title"
                    id="job-title"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="bi-geo-alt custom-icon"></i>
                  </span>

                  <input
                    type="password"
                    name="job-location"
                    id="job-location"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className="col-lg-12 col-12">
                <button
                  type="submit"
                  className="form-control"
                  onClick={handleClick}
                >
                  Registrarse
                </button>
              </div>

              <div className="col-12">
                <div className="d-flex flex-wrap align-items-center mt-4 mt-lg-0">
                  <span className="text-white mb-lg-0 mb-md-0 me-2">
                    Puedes Ingresar en :
                  </span>

                  <div>
                    <a href="" className="badge" onClick={handleClick}>
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
