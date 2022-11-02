const { response } = require("express");
const Ingredientes = require("../models/ingredientes");
const Pedido_ing = require("../models/pedido_ing");
const Proveedor = require("../models/proveedor");

const crearPedido_ing = async (req, res = response) => {
  const { body } = req;
  try {
    const id_proveedorExists = await Proveedor.findOne({
      where: {
        id_proveedor: body.id_proveedor,
      },
    });

    if (!id_proveedorExists) {
      return res.status(404).json({
        msg: `El proveedor con id: ${body.id_proveedor} no existe`,
      });
    }

    const id_ingExists = await Ingredientes.findOne({
      where: {
        id_ing: body.id_ing,
      },
    });

    if (!id_ingExists) {
      return res.status(404).json({
        msg: `El ingrediente : ${body.id_ing} no existe`,
      });
    }

    const pedido = new Pedido_ing(body);

    await pedido.save();

    res.status(200).json({ msg: "ok", pedido });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerPedidosIngredientes = async (req, res = response) => {
  const pedidosIngredientes = await Pedido_ing.findAll({
    include: [
      {
        model: Proveedor,
      },
      {
        model: Ingredientes,
      },
    ],
  });
  res.json({ pedidosIngredientes });
};

module.exports = {
  crearPedido_ing,
  obtenerPedidosIngredientes,
};
