const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearPedido_ing,
  crearPedidoIng2,
} = require("../controller/pedido_ing.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Crear Pedido_Ing
router.post(
  "/pedido-ingrediente",
  [
    check("fecha_despacho", "la fecha es obligatorio").not().isEmpty(),
    check("cantidad", "la cantidad es obligatorio").not().isEmpty(),
    check("precio", "el precio es obligatorio").not().isEmpty(),
    check("id_proveedor", "el proveedor es obligatorio").not().isEmpty(),
    check("id_ing", "el ingrediente es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearPedido_ing
);

module.exports = router;
