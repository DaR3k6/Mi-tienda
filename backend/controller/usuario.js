const usuarioModelo = require("../model/Usuario");
var bcrypt = require("bcryptjs");

//REGISTRAR USUARIO
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, cuidad, zonaPostal, email, password, Rol_idRol } =
      req.body;

    //ENCRIPTO LA CONTRASEÑA
    const hashPassword = bcrypt.hashSync(password, 10);

    const usuarioRegistrado = await usuarioModelo.registrarUsuario(
      nombre,
      apellido,
      cuidad,
      zonaPostal,
      email,
      hashPassword,
      Rol_idRol
    );

    if (usuarioRegistrado.status) {
      res.status(200).json({
        mensaje: "Usuario registrado exitosamente",
        status: true,
        usuario: usuarioModelo.toJSON(),
      });
    } else {
      res.status(500).json({ mensaje: "Error al registrar usuario" });
    }
  } catch (error) {}
};

module.exports = { registrarUsuario };
