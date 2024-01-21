import img from "../../../public/images/logo2.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";

const Header = () => {
  const { setAutenticado } = UseAuth();
  const navigate = useNavigate();

  const cerrarSesion = event => {
    const selectedValue = event.target.value;
    if (selectedValue === "3") {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres salir de la página?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, salir",
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire("Sesión cerrada", "Éxito", "success");
          console.log("Cerrar sesión");
          localStorage.clear();
          setAutenticado({});
          navigate("/");
        }
      });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a
            className="navbar-brand d-flex align-items-center"
            href="index.html"
          >
            <img src={img} className="img-fluid logo-image" />
            <div className="d-flex flex-column ms-3">
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="index.html">
                  Inicio
                </a>
              </li>
            </ul>
          </div>
          <div className="ms-3">
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue="default"
              onChange={cerrarSesion}
            >
              <option value="default" disabled>
                Perfil 
              </option>
              <option value="1">Ajustes</option>
              <option value="2">Datos</option>
              <option value="3">Salir</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
