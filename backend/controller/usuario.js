const usuarioModelo = require("../model/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// CONTROLLADOR REGISTRAR USUARIO
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, ciudad, zonaPostal, email, password, Rol_idRol } =
      req.body;

    //VALIDACION CAMPOS OBLIGATORIOS
    if (
      !nombre ||
      !apellido ||
      !ciudad ||
      !zonaPostal ||
      !email ||
      !password ||
      !Rol_idRol
    ) {
      return res.status(400).json({
        status: false,
        error: "Todos los campos son obligatorios",
        data: req.body,
      });
    }

    //VALIDACION DEL CAMPO DEL CORREO ELECTRONICO
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        error: "Formato de correo electrónico inválido",
      });
    }
    //ENCRIPTO LA CONTRASEÑA
    const hashPassword = bcrypt.hashSync(password, 10);

    //CREO EL USUARIO EN LA BASE DE DATOS
    const usuarioRegistrado = await usuarioModelo.create({
      nombre,
      apellido,
      ciudad,
      zonaPostal,
      email,
      password: hashPassword,
      Rol_idRol,
    });

    if (usuarioRegistrado) {
      return res.status(201).json({
        status: true,
        message: "Usuario registrado exitosamente",
        usuario: usuarioRegistrado.toJSON(),
      });
    } else {
      return res
        .status(404)
        .json({ status: false, error: "Error al registrar el usuario" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error interno del servidor", status: false });
  }
};

// CONTROLLADOR OBTENER INFORMACIÓN DE UN USUARIO POR ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // VALIDACION SI EXISTE EL ID ES POSITIVO
    if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
      return res.status(400).json({
        status: false,
        error: "ID de usuario inválido",
      });
    }

    // BUSCA EL USUARIO SI EXSITE
    const usuario = await usuarioModelo.findByPk(id);

    // VEREFICA SI EXISTE
    if (!usuario) {
      return res.status(404).json({
        status: false,
        error: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      status: true,
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        Rol_idRol: usuario.Rol_idRol,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Error interno del servidor",
    });
  }
};

// CONTROLLADOR DEL LOGIN
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        error: "Correo electrónico y contraseña son obligatorios",
      });
    }

    //TOMA LA CONSULTA
    const usuario = await usuarioModelo.findOne({ where: { email } });

    // VEREFICA SI EL USUARIO EXISTE
    if (!usuario) {
      return res.status(404).json({
        status: false,
        error: "Usuario no encontrado",
      });
    }

    // VEREFICA LA CONTRASEÑA
    const descripto = bcrypt.compareSync(password, usuario.password);

    if (!descripto) {
      return res.status(401).json({
        status: false,
        error: "Contraseña incorrecta",
      });
    }

    //CREO EL TOKEN DE AUTENTICACION
    const token = jwt.sign(
      {
        userId: usuario.id,
        email: usuario.email,
      },
      process.env.SECRETO,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      status: true,
      message: "Inicio de sesión exitoso",
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        Rol_idRol: usuario.Rol_idRol,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Error interno del servidor",
    });
  }
};

module.exports = { registrarUsuario, obtenerUsuarioPorId, loginUsuario };
