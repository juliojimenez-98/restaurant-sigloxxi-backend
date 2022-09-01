const { Router } = require("express");
const {
  crearUsuario,
  obtenerUsuarios,
} = require("../controller/usuario.controller");

const router = Router();

//Crear usuario
router.post("/usuario", crearUsuario);
//Obtener todos los usuarios
router.get("/usuarios", obtenerUsuarios);

module.exports = router;
