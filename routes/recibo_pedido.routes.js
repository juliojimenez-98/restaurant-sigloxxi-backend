const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearRecibo,
    obtenerRecibos,
} = require("../controller/recibo_pedido.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//crear recibo de pedido
router.post(
    "/recibo-pedido",
    [
        check("estado", "el estado es obligatorio").not().isEmpty(),
        check("cantidad", "la cantidad es obligatorio").not().isEmpty(),
        check("fecha_recibo", "la fecha del recibo es obligatorio").not().isEmpty(),
        check("id_pedido", "el n° del pedido es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    crearRecibo
);

//obtener todos los recibos
router.get("/recibo-pedidos", obtenerRecibos);

module.exports = router;