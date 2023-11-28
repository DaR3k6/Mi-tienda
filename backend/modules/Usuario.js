    const conexion = require("./Conexion");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcryptjs");
    const secret = process.env.SECRET;

    //CREO EL MODELO DE TRAER TODOS LOS USUARIOS
    const todosUsuarios = async () => {
    try {
        const consulta = "SELECT * FROM clientes";
        const cliente = await conexion.query(consulta);

        const usuarios = cliente.map(usuario => {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            direccion: usuario.direccion,
            password: usuario.password,
        };
        });

        if (usuarios == true) {
        return {
            mensaje: "Todos los usuarios listados",
            status: true,
            usuarios: {
            usuarios,
            },
        };
        } else {
        return {
            mensaje: "Error en traer todos los usuarios",
            status: false,
        };
        }
    } catch (error) {
        console.log("Error en al conexion en la base de datos");

        return {
        mensaje: "Error en la base de datos",
        status: false,
        error: error.message,
        };
    }
    };

    //CREO EL MODELO DE REGISTRARSE
    const registrar = async () => {
    try {
        //ENCRYPTO LA CONTRASEÑA
        const hashedPassword = await bcrypt.hash(usuario.password, 10);

        const consulta =
        "INSERT INTO clientes (nombre_cliente	, email_cliente, direccion_cliente, password_cliente) VALUES (?, ?, ?, ?)";
        const resultado = await conexion.query(consulta, [
        usuario.nombre,
        usuario.email,
        usuario.direccion,
        hashedPassword,
        ]);

        return {
        mensaje: "Usuario registrado correctamente",
        status: true,
        idUsuarioRegistrado: resultado.insertId,
        };
    } catch (error) {
        console.log("Error al registrar usuario en la base de datos:", error);
        return {
        mensaje: "Error al registrar usuario",
        status: false,
        error: error.message,
        };
    }
    };

    //MODELO PARA LISTAR UN USUARIO
    const listarUnUsuario = async idUsuario => {
    try {
        const consulta = "SELECT * FROM clientes WHERE id_cliente = ?";
        const [usuario] = await conexion.query(consulta[idUsuario]);

        if (usuario.length === 0) {
        return {
            mensaje: "Usuario no encontrado",
            status: false,
            usuario,
        };
        }

        return {
        mensaje: "Usuario obtenido correctamente",
        status: true,
        usuario: usuario[0],
        };
    } catch (error) {
        console.log("Error al obtener usuario de la base de datos:", error);
        return {
        mensaje: "Error al obtener usuario",
        status: false,
        error: error.message,
        };
    }
    };

    //MODELO DEL LOGIN
    const loginUsuario = async (email, password) => {
    try {
        const consulta = "SELECT * FROM clientes WHERE email = ?";
        const [usuario] = await conexion.query(consulta, [email]);

        if (!usuario) {
        return {
            mensaje: "Usuario no encontrado",
            status: false,
        };
        }

        //VEREFICA SI LA CONTRASEÑA CONCIDEN
        const vereficacionPassword = await bcrypt.compare(
        password,
        usuario.password
        );

        if (!vereficacionPassword) {
        return {
            mensaje: "Contraseña incorrecta",
            status: false,
        };
        }
        const usuarioConInfo = {
        id: usuario.id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        password: usuario.password,
        };

        //GENERAR EL TOKEN
        const token = jwt.sign({ userId: usuario.id }, secret, {
        expiresIn: "1d",
        });

        return {
        mensaje: "Login exitoso",
        status: true,
        usuario: {
            usuarioConInfo,
            token,
        },
        };
    } catch (error) {
        console.error("Error en el login:", error);
        return {
        mensaje: "Error en el login",
        status: false,
        error: error.message,
        };
    }
    };

    module.exports = {
    todosUsuarios,
    registrar,
    listarUnUsuario,
    loginUsuario,
    };
