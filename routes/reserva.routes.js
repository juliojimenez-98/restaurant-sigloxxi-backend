const { Router } = require("express");
const { check } = require("express-validator");
const { crearReserva } = require("../controller/reserva.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Crear reserva
router.post("/reserva", crearReserva);

module.exports = router;
