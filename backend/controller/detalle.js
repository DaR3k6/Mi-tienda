const sequelize = require("../model/Conexion");
const detalleModel = require("../model/Detalle");
const productoModel = require("../model/Producto");
const facturaModel = require("../model/Factura");
const metodoPago_has_FacturaModel = require("../model/MetodoPagoHas");
const transporter = require("../helpers/nodemailer");
// CONTROLADOR PARA AGREGAR UN DETALLE
const agregarDetalle = async (req, res) => {
  try {
    const { cantidad, precioUnitario, Producto_idProducto, idMetodoPago } =
      req.body;

    //OBTIENE EL TOKEN AUTENTICADO
    const nombreUsuario = req.user;

    // VALIDACIONES DE ENTRADA
    if (
      !cantidad ||
      cantidad <= 0 ||
      !precioUnitario ||
      precioUnitario <= 0 ||
      !Producto_idProducto ||
      !idMetodoPago
    ) {
      return res.status(400).json({
        mensaje: "Por favor, proporcione datos válidos para la compra",
        status: false,
      });
    }

    // VEREFICA SI EL PRODUCTO EXISTE
    const producto = await productoModel.findByPk(Producto_idProducto);
    if (!producto) {
      return res.status(404).json({
        mensaje: "El producto seleccionado no existe",
        status: false,
      });
    }

    // VEREFICA SI HAY SUFICIENTE STOCK
    if (producto.stock < cantidad) {
      return res.status(400).json({
        mensaje: "No hay suficiente stock para realizar la compra",
        status: false,
      });
    }

    // OBTIENE EL MAXIMO ID DEL DETALLE
    const maxIdDetalle = await detalleModel.max("idDetalle");
    const nuevoIdDetalle = maxIdDetalle ? maxIdDetalle + 1 : 1;

    // CREA LA FACTURA CON EL NUEVO METODO DE PAGO
    const nuevaFactura = await facturaModel.create({
      fecha: new Date(),
      total: 0,
      estado: 0,
    });

    // CREA EL DETALLE ASOCIADO CON LA FACTURA
    const nuevoDetalle = await detalleModel.create({
      idDetalle: nuevoIdDetalle,
      cantidad,
      precioUnitario,
      Producto_idProducto,
      Factura_idFactura: nuevaFactura.idFactura,
    });

    // ACTUALIZO EL NUEVO TOTAL DEL DETALLE CON LA FACTURA
    nuevaFactura.total += cantidad * precioUnitario;
    await nuevaFactura.save();

    // RELACIONO CON EL METODO DE PAGO DEL DETALLE
    await metodoPago_has_FacturaModel.create({
      MetodoPago_idMetodoPago: idMetodoPago,
      Factura_idFactura: nuevaFactura.idFactura,
    });

    // RESTO LA CANTIDAD DEL STOCK DEL PRODUCTO
    producto.stock -= cantidad;
    await producto.save();

    //CAPTURO EL ID DEL PRODUCTO QUE ESTA ASOCIADO
    const productoID = await productoModel.findByPk(Producto_idProducto, {});
    const info = await transporter.sendMail({
      to: req.user.email,
      subject: "Confirmación de Compra",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        dir="ltr"
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <meta charset="UTF-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta content="telephone=no" name="format-detection" />
          <title></title>
          <!--[if (mso 16)]>
            <style type="text/css">
              a {
                text-decoration: none;
              }
            </style>
          <![endif]-->
          <!--[if gte mso 9
            ]><style>
              sup {
                font-size: 100% !important;
              }
            </style><!
          [endif]-->
          <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          <![endif]-->
        </head>
      
        <body>
          <div dir="ltr" class="es-wrapper-color">
            <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#a6adb9"></v:fill>
              </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td class="esd-email-paddings" valign="top">
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      class="esd-header-popover es-header"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td class="esd-stripe" align="center">
                            <table
                              bgcolor="#c6dde2"
                              class="es-header-body"
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              width="600"
                              style="background-color: #c6dde2"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="esd-structure es-p15b es-p40r es-p40l"
                                    align="left"
                                  >
                                    <!--[if mso]><table width="520" cellpadding="0" cellspacing="0"><tr><td width="180" valign="top"><![endif]-->
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-left"
                                      align="left"
                                    >
                                      <tbody>
                                        <tr class="es-mobile-hidden">
                                          <td
                                            width="160"
                                            class="es-m-p0r es-m-p20b esd-container-frame"
                                            valign="top"
                                            align="center"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    class="esd-block-spacer"
                                                    height="20"
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td class="es-hidden" width="20"></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if mso]></td><td width="160" valign="top"><![endif]-->
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      align="left"
                                      class="es-left"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="160"
                                            align="left"
                                            class="esd-container-frame es-m-p20b"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              bgcolor="#F0F0F0"
                                              style="background-color: #f0f0f0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    class="esd-empty-container"
                                                    style="display: none"
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if mso]></td><td width="20"></td><td width="160" valign="top"><![endif]-->
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-right"
                                      align="right"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="160"
                                            align="left"
                                            class="esd-container-frame"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr class="es-mobile-hidden">
                                                  <td
                                                    align="center"
                                                    class="esd-block-spacer"
                                                    height="20"
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      class="es-content"
                      cellspacing="0"
                      cellpadding="0"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td class="esd-stripe" align="center">
                            <table
                              class="es-content-body"
                              style="background-color: #c6dde2"
                              width="600"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="#c6dde2"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="esd-structure es-p30t es-p40b es-p40r es-p40l"
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="es-m-p0r es-m-p20b esd-container-frame"
                                            width="520"
                                            valign="top"
                                            align="center"
                                          >
                                            <table
                                              width="100%"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    class="esd-block-image"
                                                    style="font-size: 0px"
                                                  >
                                                    <a
                                                      target="_blank"
                                                      href="https://viewstripo.email"
                                                      ><img
                                                        class="adapt-img"
                                                        src="https://tlr.stripocdn.email/content/guids/CABINET_6cca7b63ced681c2e7fa6433dd1f1323/images/womanlisteningmusicdoublecolorexposureeffect.jpg"
                                                        alt="Small Business Saturday"
                                                        style="
                                                          display: block;
                                                          border-radius: 0 100px 0
                                                            50px;
                                                        "
                                                        width="520"
                                                        title="Small Business Saturday"
                                                    /></a>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    class="esd-block-image es-p20t"
                                                    style="font-size: 0px"
                                                  >
                                                    <a
                                                      target="_blank"
                                                      href="https://viewstripo.email"
                                                      ><img
                                                        class="adapt-img"
                                                        src="https://tlr.stripocdn.email/content/guids/CABINET_6cca7b63ced681c2e7fa6433dd1f1323/images/group_65_kk7.png"
                                                        alt="Small business Saturday"
                                                        style="display: block"
                                                        width="520"
                                                        title="Small business Saturday"
                                                    /></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      class="es-content"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td class="esd-stripe" align="center">
                            <table
                              bgcolor="#ffffff"
                              class="es-content-body"
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              width="600"
                              style="background-color: #ffffff"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="esd-structure es-p40t es-p30b es-p20r es-p20l"
                                    align="left"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="560"
                                            class="esd-container-frame"
                                            align="center"
                                            valign="top"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    class="esd-block-text es-p40r es-p40l es-m-p0r es-m-p0l"
                                                  >
                                                    <p style="font-size: 16px">
                                                      <strong
                                                        >Nuestras ofertas de
                                                        vacaciones estarán aquí antes
                                                        de que te des cuenta, con
                                                        descuentos en productos
                                                        seleccionados a partir de
                                                        $100. Agrega lo que desees a
                                                        tu carrito ahora y ahorra
                                                        tiempo también.</strong
                                                      >
                                                    </p>
                                                    <p style="font-size: 18px">
                                                      <br />
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      class="es-content"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td class="esd-stripe" align="center" esdev-config="h1">
                            <table
                              bgcolor="#ffffff"
                              class="es-content-body"
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              width="600"
                              style="background-color: #ffffff"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="esd-structure es-p40t es-p40r es-p40l"
                                    align="left"
                                    background="https://tlr.stripocdn.email/content/guids/CABINET_6cca7b63ced681c2e7fa6433dd1f1323/images/mask_group_QYB.png"
                                    style="
                                      background-image: url(https://tlr.stripocdn.email/content/guids/CABINET_6cca7b63ced681c2e7fa6433dd1f1323/images/mask_group_QYB.png);
                                      background-repeat: no-repeat;
                                      background-position: right top;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="520"
                                            class="esd-container-frame"
                                            align="center"
                                            valign="top"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              style="
                                                border-radius: 0px 120px 0px 60px;
                                                border-collapse: separate;
                                                background-color: #f0f0f0;
                                              "
                                              bgcolor="#F0F0F0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    class="esd-block-image"
                                                    style="font-size: 0px"
                                                  >
                                                    <a
                                                      target="_blank"
                                                      href="https://viewstripo.email"
                                                      ><img
                                                        class="adapt-img"
                                                        src="https://tlr.stripocdn.email/content/guids/CABINET_6cca7b63ced681c2e7fa6433dd1f1323/images/group_68removebgpreview.png"
                                                        alt
                                                        style="
                                                          display: block;
                                                          border-radius: 0px 100px 0px
                                                            50px;
                                                        "
                                                        width="520"
                                                    /></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="esd-structure es-p20t es-p40b es-p40r es-p40l"
                                    align="left"
                                  >
                                     <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-left"
                                      align="left"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="80"
                                            class="es-m-p20b esd-container-frame"
                                            align="left"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="left"
                                                    class="esd-block-image es-m-txt-c"
                                                    style="font-size: 0px"
                                                  >
                                                    <a
                                                      target="_blank"
                                                      href="https://viewstripo.email"
                                                      ><img
                                                        src="https://tlr.stripocdn.email/content/guids/CABINET_6cca7b63ced681c2e7fa6433dd1f1323/images/ellipse_71_u10.png"
                                                        class="p_image"
                                                        alt
                                                        style="display: block"
                                                        width="40"
                                                    /></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                     <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-right"
                                      align="right"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="420"
                                            align="left"
                                            class="esd-container-frame"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="right"
                                                    class="esd-block-text"
                                                  >
                                                    <h2
                                                      style="line-height: 150%"
                                                      class="p_name"
                                                    >${productoID.nombre}
                                                    </h2>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    align="right"
                                                    class="esd-block-spacer es-p5t es-p5b"
                                                    style="font-size: 0"
                                                  >
                                                    <table
                                                      border="0"
                                                      width="40%"
                                                      height="100%"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              border-bottom: 1px solid
                                                                #d90429;
                                                              background: none;
                                                              height: 1px;
                                                              width: 100%;
                                                              margin: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    align="right"
                                                    class="esd-block-text es-p5t es-m-txt-c"
                                                  >
                                                    <h2
                                                      style="
                                                        font-size: 20px;
                                                        color: #2b2d42;
                                                      "
                                                    >
                                                      <em class="p_description"
                                                        >PRECIO: $${producto.precio.toLocaleString(
                                                          "es-CO",
                                                          {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                          }
                                                        )}</em
                                                      >
                                                    </h2>

                                                    <h2
                                                    style="
                                                      font-size: 20px;
                                                      color: #2b2d42;
                                                    "
                                                  >
                                                    <em class="p_description"
                                                      >CANTIDAD: ${
                                                        nuevoDetalle.cantidad
                                                      }</em
                                                    >
                                                  </h2>


                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    align="right"
                                                    class="esd-block-spacer es-p5t es-p5b"
                                                    style="font-size: 0"
                                                  >
                                                    <table
                                                      border="0"
                                                      width="40%"
                                                      height="100%"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            style="
                                                              border-bottom: 1px solid
                                                                #d90429;
                                                              background: none;
                                                              height: 1px;
                                                              width: 100%;
                                                              margin: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    align="right"
                                                    class="esd-block-text es-p5t es-m-txt-c"
                                                  >
                                                    <p style="font-size: 16px">
                                                      <strong
                                                        ><span class="p_price"
                                                          >TOTAL:  ${nuevaFactura.total.toLocaleString(
                                                            "es-CO",
                                                            {
                                                              style: "currency",
                                                              currency: "COP",
                                                              minimumFractionDigits: 0,
                                                            }
                                                          )}</span
                                                        ></strong
                                                      ><strong class="p_price"
                                                        ><strong></strong>
                                                       </strong
                                                      >
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
  `,
    });
    return res.status(200).json({
      mensaje: "Compra realizada con éxito",
      status: true,
      factura: nuevaFactura,
      detalle: nuevoDetalle,
      maxIdDetalle,
      nombreCliente: nombreUsuario,
      producto: productoID,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al realizar la compra",
      status: false,
      error: error.message,
    });
  }
};

//CONTROLADOR PARA LISTAR UN DETALLE
const listarDetalle = async (req, res) => {
  try {
    const detalle = await detalleModel.findAll({
      attributes: ["idDetalle", "cantidad", "precioUnitario"],
      include: [
        {
          model: productoModel,
          attributes: ["idProducto", "nombre", "precio"],
          where: {
            idProducto: sequelize.literal(
              "detalle.Producto_idProducto=producto.idProducto"
            ),
          },
        },
        {
          model: facturaModel,
          attributes: ["idFactura", "fecha", "total", "estado"],
        },
      ],
    });

    res.status(200).json({
      mensaje: "Detalle listado correctamente",
      status: true,
      detalle: detalle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al listar el detalle",
      status: false,
      error: error.message,
    });
  }
};

//CONTROLADOR PARA ELIMINAR UN DETALLE
const eliminarDetalle = async (req, res) => {
  try {
    const idDetalle = req.params.id;

    // VEREFICA SI EXISTE EL DETALLE
    const detalleExistente = await detalleModel.findByPk(idDetalle);
    if (!detalleExistente) {
      return res.status(404).json({
        mensaje: "Detalle no encontrado",
        status: false,
      });
    }

    // Obtener la factura asociada al detalle antes de eliminarlo
    const facturaAsociada = await facturaModel.findByPk(
      detalleExistente.Factura_idFactura
    );

    // Eliminar el detalle
    await detalleExistente.destroy();

    // Actualizar el total de la factura después de eliminar el detalle
    if (facturaAsociada) {
      const detallesFactura = await detalleModel.findAll({
        where: { Factura_idFactura: facturaAsociada.idFactura },
        attributes: ["cantidad", "precioUnitario"],
      });

      // Calcular el nuevo total de la factura
      let nuevoTotal = 0;
      detallesFactura.forEach(detalle => {
        nuevoTotal += detalle.cantidad * detalle.precioUnitario;
      });

      // Actualizar el total en la factura
      facturaAsociada.total = nuevoTotal;
      await facturaAsociada.save();
    }

    return res.status(200).json({
      mensaje: "Detalle eliminado correctamente",
      status: true,
      detalle: detalleExistente,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al eliminar el detalle",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  agregarDetalle,
  listarDetalle,
  eliminarDetalle,
};
