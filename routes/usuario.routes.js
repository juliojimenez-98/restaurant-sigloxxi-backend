const { Router } = require("express");
const { crearUsuario } = require("../controller/usuario.controller");

const router = Router();

//Crear usuario
router.post("/usuario", crearUsuario);

module.exports = router;
