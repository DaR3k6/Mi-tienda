import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPublico from "../components/publica/LayoutPublic";
import Error from "../components/privada/Error";
import Login from "../components/publica/Login";
import Register from "../components/publica/Register";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rutas publicas*/}
        <Route path="/" element={<LayoutPublico />}>
          <Route index element={<Login />} />
          <Route path="/Registro" element={<Register />} />
        </Route>

        {/*Rutas privadas*/}
        <Route></Route>

        {/*Rutas Error*/}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
