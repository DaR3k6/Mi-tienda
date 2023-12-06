const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Verifica el token válido en el header de la request, Authorization
  const jwtToken = req.header("Authorization");
  if (!jwtToken) {
    return res.status(401).json({
      resultado: "error",
      mensaje: "Acceso denegado, No tiene token válido",
    });
  }
  try {
    const payload = jwt.verify(jwtToken, process.env.SECRETO);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      resultado: "error",
      mensaje: "Token no válido",
    });
  }
};

module.exports = auth;
