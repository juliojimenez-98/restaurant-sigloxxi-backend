const { response } = require("express");
const Recibo_pedido = require("../models/recibo_pedido");
const Pedido_ing = require("../models/pedido_ing");
const Ingredientes = require("../models/ingredientes");
const Bebestibles = require("../models/bebestibles");

const crearRecibo = async (req, res = response) => {
  const { body } = req;
  try {
    const id_pedidoExists = await Pedido_ing.findOne({
      where: {
        id_pedido: body.id_pedido,
      },
      include: [
        {
          model: Bebestibles,
        },
        {
          model: Ingredientes,
        },
      ],
    });

    if (!id_pedidoExists) {
      return res.status(404).json({
        msg: `El pedido con id: ${body.id_pedido} no existe`,
      });
    }

    if (id_pedidoExists.estado === 0) {
      return res.status(404).json({
        msg: `El pedido con id: ${body.id_pedido} ya está ingresado`,
      });
    }

    const recibo_pedido = new Recibo_pedido(body);

    await recibo_pedido.save();

    if (recibo_pedido.estado === 1 || recibo_pedido.estado === 2) {
      if (id_pedidoExists.id_ing !== null) {
        const actStockIng = await Ingredientes.update(
          { stock: id_pedidoExists.ingrediente.stock + recibo_pedido.cantidad },
          {
            where: {
              id_ing: id_pedidoExists.id_ing,
            },
          }
        );
      }

      if (id_pedidoExists.id_bebida !== null) {
        const actStockIng = await Bebestibles.update(
          { stock: id_pedidoExists.bebestible.stock + recibo_pedido.cantidad },
          {
            where: {
              id_bebida: id_pedidoExists.id_bebida,
            },
          }
        );
      }
    }

    const actEstadoPedido = await id_pedidoExists.update(
      { estado: 0 },
      {
        where: {
          id_pedido: recibo_pedido.id_pedido,
        },
      }
    );

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
    include: [
      {
        model: Pedido_ing,
        include: [
          {
            model: Ingredientes,
          },
          {
            model: Bebestibles,
          },
        ],
      },
    ],
  });
  res.json({ recibo_pedidos });
};

module.exports = {
  crearRecibo,
  obtenerRecibos,
};
