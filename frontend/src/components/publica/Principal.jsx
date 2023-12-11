import Header from "./Header";
import Cuerpo from "./Cuerpo";
import Footer from "./Footer";
const Principal = () => {
  return (
    <>
      <div className="container" id="top">
        <Header />
        <Cuerpo />
        <Footer />
      </div>
    </>
  );
};

export default Principal;
