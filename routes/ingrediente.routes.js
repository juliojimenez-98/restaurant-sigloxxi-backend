const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearIngrediente,
  actualizarIngrediente,
  obtenerIngredientes,
  obtenerIngredientePorId,
  eliminarIngrediente,
} = require("../controller/ingredientes.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/ingredientes", obtenerIngredientes);

router.get("/ingrediente/:id", obtenerIngredientePorId);

router.post(
  "/ingrediente",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("fecha_vencimiento", "La fecha de vencimiento es obligatoria")
      .not()
      .isEmpty(),
    check("stock", "El stock es obligatorio").not().isEmpty(),
    check("stock_cri", "El stock critico es obligatorio").not().isEmpty(),
    check("unidad", "La unidad del ingrediente es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  crearIngrediente
);

router.put("/ingrediente/:id", actualizarIngrediente);

router.delete("/ingrediente/:id", eliminarIngrediente);
module.exports = router;
