const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearBebestible,
    obtenerBebestible,
    eliminarBebestible,
    actualizarBebestible,
} = require("../controller/bebestibles.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Crear bebida
router.post(
    "/bebestible",
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("precio", "El precio es obligatorio").not().isEmpty(),
      check("stock", "El stock es obligatorio").not().isEmpty(),
      check("stock_cri", "El stock critico es obligatorio").not().isEmpty(),
      check("unidad", "La unidad del ingrediente es obligatoria").not().isEmpty(),
      check("fecha_vencimiento", "La fecha de vencimiento es obligatoria").not().isEmpty(),
      validarCampos,
    ],
    crearBebestible
);

//Eliminar bebida
router.delete("/bebestible/:id", eliminarBebestible);
//Obtener bebidas
router.get("/bebestibles", obtenerBebestible);
//Actualizar bebida
router.put("/bebestible/:id", actualizarBebestible);

module.exports = router;