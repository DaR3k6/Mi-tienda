import UseAuth from "../../helpers/UseAuth";
import { Navigate, Outlet } from "react-router-dom";

const LayoutPublico = () => {
  const { Autenticado } = UseAuth();
  console.log("Layout Publico", Autenticado);
  return <>{!Autenticado.idUsuario ? <Outlet /> : <Navigate to="/Inicio" />}</>;
};

export default LayoutPublico;
