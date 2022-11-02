const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorCliente,
  cancelarReserva,
  confirmarReserva,
} = require("../controller/reserva.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
//
router.get("/reservas", obtenerReservas);
//Crear reserva
router.post("/reserva", crearReserva);

router.get("/reserva/:email", obtenerReservaPorCliente);

router.put("/cancelar/:id", cancelarReserva);

router.put("/confirmar/:id", confirmarReserva);

module.exports = router;
