const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearReceta,
  obtenerRecetas,
  actualizarReceta,
  eliminarReceta,
  obtenerRecetaPorId,
} = require("../controller/receta.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
router.get("/recetas", obtenerRecetas);

router.post(
  "/receta",
  [
    check("prep", "La preparación es obligatoria").not().isEmpty(),
    check("nombre_prep", "El Nombre de la preparacion es obligatorio")
      .not()
      .isEmpty(),
    check("tiempo_prep", "El tiempo de preparación es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearReceta
);

router.get("/receta/:id", obtenerRecetaPorId);
router.put("/receta/:id", actualizarReceta);
router.delete("/receta/:id", eliminarReceta);

module.exports = router;
