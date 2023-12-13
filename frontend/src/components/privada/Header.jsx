import img from "../../../public/images/logo2.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";
const Header = () => {
  const { setAutenticado } = UseAuth();
  //REDIRIGE
  const navigate = useNavigate();
  //ALERTA PARA CERRAR SESION
  const cerrarSesion = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "3") {
      Swal.fire({
        title: "Estas seguro?",
        text: "Quieres salir de la pagina!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Salir!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Sesion cerrada!", "Exitosamente.", "success");
          console.log("cerrar sesion");
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
          <div className="select" id="navbarNav">
            <ul className="navbar-nav align-items-center ">
              <select
                className="form-select"
                aria-label="Default select example"
                onClick={cerrarSesion}
              >
                <option selected>
                  Perfil<i className="bi bi-person-fill"></i>
                </option>
                <option value="1">Ajustes</option>
                <option value="2">Datos</option>
                <option value="3">Salir</option>
              </select>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
