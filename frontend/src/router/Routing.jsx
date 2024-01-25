import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPublico from "../components/publica/LayoutPublic";
import Error from "../components/privada/Error";
import Login from "../components/publica/Login";
import Register from "../components/publica/Register";
import LayoutPrivada from "../components/privada/LayoutPrivada";
import Principal from "../components/privada/Principal";
import { AuthProvider } from "../components/context/AuthProvier";
import DetalleCompra from "../components/privada/DetalleCompra";
const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*Rutas publicas*/}
          <Route path="/" element={<LayoutPublico />}>
            <Route index element={<Login />} />
            <Route path="/Registro" element={<Register />} />
          </Route>
          {/*Rutas privadas*/}
          <Route path="/Inicio" element={<LayoutPrivada />}>
            <Route index element={<Principal />} />
            <Route path="DetalleCompra/:id" element={<DetalleCompra />} />
          </Route>
          {/*Rutas Error*/}
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
