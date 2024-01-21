import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";

const Cards = ({ itemCarrito }) => {
  //CAPTURO EL TOKEN
  const usuario = localStorage.getItem("usuario");
  const userObj = JSON.parse(usuario);
  //CREAMOS ESTADOS PARA TRAER TODOS LOS PRODUCTOS
  const [estado, setEstado] = useState(null);
  const [productos, setProductos] = useState(null);

  //LLAMO LA GESTION DEL CARRITO DE COMPRAS
  const [carrito, setCarrito] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  //TRAE TODOS LOS PRODUCTOS
  const cargarProductos = async () => {
    fetch(Global.url + "productos/obtener", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userObj.token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado(data.status);
        console.log(data.productos);
        localStorage.setItem("productos", JSON.stringify(data.productos));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  //FUNCION DE ALMCENAR EL CARRITO DE COMPRAS
  const almacenarCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem("productos")) || [];
    console.log(localStorage.getItem("productos"));
    setCarrito(carritoActual);
  };

  //AÑADO EL CARRITO DE COMPRAS
  const anadoCarrito = (producto) => {
    console.log(carrito);
    console.log(producto);
    setCarrito([...carrito, producto]);

    //VEREFICA SI EL PRODUCTO YA ESTA EN EL CARRITO DE COMPRAS
    const productoExistente = carrito.findIndex(
      (item) => item.idProducto === producto.idProducto
    );

    if (productoExistente) {
      // El producto no está en el carrito, lo agregamos
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);

      Swal.fire({
        icon: "success",
        title: "Producto Agregado al Carrito",
        text: `${producto.nombre} se ha añadido al carrito.`,
      });

      localStorage.setItem("productos", JSON.stringify([...carrito, producto]));
      setActualizar(true);
    } else {
      // El producto ya existe en el carrito, no lo agregamos nuevamente
      Swal.fire({
        icon: "info",
        title: "Producto Ya en el Carrito",
        text: `${producto.nombre} ya está en el carrito.`,
      });
    }
  };

  useEffect(() => {
    if (actualizar) {
      const timer = setTimeout(() => {
        setActualizar(false);
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [actualizar]);

  //CARGA TODOS LOS PRODUCTOS
  useEffect(() => {
    cargarProductos();
    almacenarCarrito();
  }, []);

  return (
    <>
      <section
        className="job-section recent-jobs-section section-padding"
        id="cards"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12 mb-4">
              <h2>Tarjeta de Productos</h2>

              <p>
                <strong>Productos Descuento </strong>.
                <br /> Encuentra aqui todas nuestras cuentas de juegos
                disponibles para que puedas divertirtey presumir con tus amigos.
              </p>
            </div>

            <div className="clearfix"></div>

            {estado === true ? (
              productos.map((producto, index) => {
                return (
                  <div key={index} className="col-lg-4 col-md-6 col-12">
                    <div className="job-thumb job-thumb-box">
                      <div className="job-image-box-wrap">
                        <img
                          src={producto.imagen}
                          className="job-image img-fluid"
                          alt=""
                        />
                        <div className="job-image-box-wrap-info d-flex align-items-center">
                          <p className="mb-0">
                            <a className="badge badge-level">
                              {producto.marca}
                            </a>
                          </p>
                          <p className="mb-0">
                            <a href="job-listings.html" className="badge">
                              {producto.marca}
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="job-body">
                        <h4 className="job-title">
                          <a href="job-details.html" className="job-title-link">
                            {producto.nombre}
                          </a>
                        </h4>

                        <div className="d-flex align-items-center">
                          <div className=" d-flex align-items-center bg-white  mt-2 mb-4">
                            <p className="mb-0">
                              Descripcion: {producto.descripcion}
                            </p>
                          </div>

                          <a href="#" className="bi-bookmark ms-auto me-2"></a>

                          <a href="#" className="bi-heart"></a>
                        </div>

                        <div className="d-flex align-items-center">
                          <p className="job-location">
                            Stock : <strong>{producto.stock}</strong>
                          </p>

                          <p className="job-date">
                            <i className="custom-icon bi-clock me-1"></i>
                            <strong>
                              {producto.fechaPublicacion.slice(0, 10)}
                            </strong>
                          </p>
                        </div>

                        <div className="d-flex align-items-center border-top pt-3">
                          <p className="job-price mb-0">
                            <i className="custom-icon bi-cash me-1"></i>
                            {producto.precio}K
                          </p>

                          <a
                            className="custom-btn btn ms-auto"
                            onClick={() => anadoCarrito(producto)}
                          >
                            Agregar <i className="bi bi-cart-plus"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <h3 className="text-center">
                  Lo siento Por ahora no hay cards 😅
                </h3>
                <p className="text-center">
                  Se actualizara automaticamente la pagina al momento de agregar
                  una.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cards;
