const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerRoles,
} = require("../controller/usuario.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Crear usuario
router.post(
  "/usuario",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("appa", "El apellido es obligatorio").not().isEmpty(),
    check("id_rol", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);
//Obtener todos los usuarios
router.get("/usuarios", obtenerUsuarios);
router.get("/roles", obtenerRoles);

module.exports = router;
