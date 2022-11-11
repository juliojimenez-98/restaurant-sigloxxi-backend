const { response } = require("express");
const Recibo_pedido = require("../models/recibo_pedido");
const Pedido_ing = require("../models/pedido_ing");

const crearRecibo = async (req, res = response) => {
  const { body } = req;
  try {
    const id_pedidoExists = await Pedido_ing.findOne({
      where: {
        id_pedido: body.id_pedido,
      },
    });

    if (!id_pedidoExists) {
      return res.status(404).json({
        msg: `El pedido con id: ${body.id_pedido} no existe`,
      });
    }

    const recibo_pedido = new Recibo_pedido(body);

    await recibo_pedido.save();

    console.log(recibo_pedido);

    res.status(200).json({ msg: "ok", recibo_pedido });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerRecibos = async (req, res = response) => {
  const recibo_pedidos = await Recibo_pedido.findAll({
    include: Pedido_ing,
  });
  res.json({ recibo_pedidos });
};

module.exports = {
  crearRecibo,
  obtenerRecibos,
};
