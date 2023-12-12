import { Outlet } from "react-router-dom";
// import UseAuth from "../../helpers/UseAuth";

const LayoutPrivada = () => {
  //   const { Autenticado } = UseAuth();
  //   console.log("Layout Publico", Autenticado);
  //   {!Autenticado._id ? : }
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutPrivada;
