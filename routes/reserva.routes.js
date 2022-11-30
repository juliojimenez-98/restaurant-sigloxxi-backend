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
router.post(
  "/reserva",
  [
    check("hora_reserva", "La hora de la reserva es obligatoria")
      .not()
      .isEmpty(),
    check("cant_personas", "La cantidad de personas es obligatoria")
      .not()
      .isEmpty(),
    check("fecha_reserva", "La fecha de la reserva es obligatoria")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearReserva
);

router.get("/reserva/:email", obtenerReservaPorCliente);

router.put("/cancelar/:id", cancelarReserva);

router.put("/confirmar/:id", confirmarReserva);

module.exports = router;
