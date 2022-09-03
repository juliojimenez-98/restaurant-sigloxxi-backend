const { Router } = require("express");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerRoles,
} = require("../controller/usuario.controller");

const router = Router();

//Crear usuario
router.post("/usuario", crearUsuario);
//Obtener todos los usuarios
router.get("/usuarios", obtenerUsuarios);
router.get("/roles", obtenerRoles);

module.exports = router;
