const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerPlatos,
  crearPlato,
  obtenerPlatoPorId,
  actualizarPlato,
  eliminarPlato,
} = require("../controller/plato.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
router.get("/platos", obtenerPlatos);

router.post(
  "/plato",
  [
    check("desc", "El desc es obligatorio").not().isEmpty(),
    check("id_receta", "El Nombre de la preparacion es obligatorio")
      .not()
      .isEmpty(),
    check("precio", "El tiempo de preparación es obligatorio").not().isEmpty(),
    check("estado", "El tiempo de preparación es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearPlato
);

router.get("/plato/:id", obtenerPlatoPorId);
router.put("/plato/:id", actualizarPlato);
router.delete("/plato/:id", eliminarPlato);

module.exports = router;
