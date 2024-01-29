import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../helpers/UseAuth";

const LayoutPrivada = () => {
  const { Autenticado } = UseAuth();
  return (
    <>
      {Autenticado && Autenticado.idUsuario ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LayoutPrivada;
