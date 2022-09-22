const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearReserva,
  obtenerReservas,
} = require("../controller/reserva.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
//
router.get("/reservas", obtenerReservas);
//Crear reserva
router.post("/reserva", crearReserva);

module.exports = router;
