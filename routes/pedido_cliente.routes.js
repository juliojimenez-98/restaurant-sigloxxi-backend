const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearPedidoCliente,
  obtenerPedidoPorMesa,
  obtenerPedidos,
  actualizarPedido,
} = require("../controller/pedido_cliente.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/pedido_cliente",
  [
    check("id_mesa", "El Nombre de la preparacion es obligatorio")
      .not()
      .isEmpty(),
    check("cant", "El tiempo de preparación es obligatorio").not().isEmpty(),
    check("tiempo_espera", "El tiempo de preparación es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearPedidoCliente
);

router.get("/:id_mesa", obtenerPedidoPorMesa);
router.put("/pedido_cliente/:id", actualizarPedido);
router.get("/pedidos/comanda", obtenerPedidos);

module.exports = router;
