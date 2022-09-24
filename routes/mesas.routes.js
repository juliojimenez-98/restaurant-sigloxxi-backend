const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearMesa,
  obtenerMesas,
  actualizarMesa,
  eliminarMesa,
} = require("../controller/mesa.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/mesas", obtenerMesas);

//Crear mesa
router.post(
  "/mesa",
  [
    check("cant_sillas", "La cantidad de sillas es obligatoria")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearMesa
);
router.put("/mesa/:id", actualizarMesa);
router.delete("/mesa/:id", eliminarMesa);

module.exports = router;
