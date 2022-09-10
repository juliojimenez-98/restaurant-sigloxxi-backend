const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerRoles,
  updatePassNewUser,
  obtenerUsuarioPorId,
  actualizarUsuario,
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

router.put(
  "/usuario/:id",
  [check("email", "El correo no es valido").isEmail(), validarCampos],
  actualizarUsuario
);

router.put(
  "/changepass/:id",
  [
    check("password", "La password es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  updatePassNewUser
);
//Obtener todos los usuarios
router.get("/usuarios", obtenerUsuarios);
router.get("/usuario/:id", obtenerUsuarioPorId);
router.get("/roles", obtenerRoles);

module.exports = router;
