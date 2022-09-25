const { Router } = require("express");
const { check } = require("express-validator");

const { crearReceta } = require("../controller/receta.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

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

module.exports = router;
