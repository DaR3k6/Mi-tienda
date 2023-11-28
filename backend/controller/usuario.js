const usuarioModelo = require("../modules/Usuario");

// CONTROLADO PARA OBTENER TODOS LOS USUARIOS
const obtenerTodosUsuarios = async (req, res) => {
  try {
    const resultado = await usuarioModelo.todosUsuarios();

    if (resultado.status) {
      return res.status(200).json(resultado);
    } else {
      return res.status(500).json(resultado);
    }
  } catch (error) {
    console.error(
      "Error en el controlador de obtener todos los usuarios:",
      error
    );
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};

// CONTROLADOR PARA REGISTRAR UN USARIO
const registrarUsuario = async (req, res) => {
  try {
    const resultadoRegistro = await usuarioModelo.registrar(req.body);

    if (resultadoRegistro.status) {
      return res.status(201).json(resultadoRegistro);
    } else {
      return res.status(500).json(resultadoRegistro);
    }
  } catch (error) {
    console.error("Error en el controlador de registro de usuario:", error);
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};

// CONTROLADOR PARA OBTENER UN SOLO ID POR USUARIO
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await usuarioModelo.listarUnUsuario(id);

    if (resultado.status) {
      return res.status(200).json(resultado);
    } else {
      return res.status(404).json(resultado);
    }
  } catch (error) {
    console.error(
      "Error en el controlador de obtener un usuario por ID:",
      error
    );
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};

// CONTROLADOR PARA OBTENER TODO EL LOGIN
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultadoLogin = await usuarioModelo.loginUsuario(email, password);

    if (resultadoLogin.status) {
      return res.status(200).json(resultadoLogin);
    } else {
      return res.status(401).json(resultadoLogin);
    }
  } catch (error) {
    console.error("Error en el controlador de login de usuario:", error);
    return res
      .status(500)
      .json({ mensaje: "Error interno del servidor", error: error.message });
  }
};

module.exports = {
  obtenerTodosUsuarios,
  registrarUsuario,
  obtenerUsuarioPorId,
  loginUsuario,
};
