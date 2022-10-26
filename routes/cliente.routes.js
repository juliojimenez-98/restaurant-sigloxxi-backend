const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCliente,
  obtenerClienteParaReserva,
} = require("../controller/cliente.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Crear cliente
router.post(
  "/cliente",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("appa", "El apellido es obligatorio").not().isEmpty(),
    check("cel", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCliente
);

router.get("/cliente/:email", obtenerClienteParaReserva);

module.exports = router;
