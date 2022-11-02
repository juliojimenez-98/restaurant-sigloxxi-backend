const { response } = require("express");
const { Op } = require("sequelize");
const PedidoCliente = require("../models/pedidoCliente");
const Plato = require("../models/plato");
const Receta = require("../models/receta");

const crearPedidoCliente = async (req, res = response) => {
  try {
    const { tiempo_espera, cant, platos, id_mesa, estado } = req.body;

    const platosArray = await Plato.findAll({
      where: { id_plato: platos },
    });
    console.log(platosArray);

    const pedidoCliente = new PedidoCliente({
      platos: platosArray,
      tiempo_espera,
      cant,
      id_mesa,
      estado,
    });

    await pedidoCliente.save();

    res.status(200).json({ msg: "ok", pedidoCliente });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const obtenerPedidoPorMesa = async (req, res = response) => {
  const id = req.params.id_mesa;
  const idInt = parseInt(id);

  const findPedido = await PedidoCliente.findOne({
    where: {
      [Op.and]: [{ id_mesa: idInt }, { estado: 1 }],
    },
  });

  res.status(200).json({
    findPedido,
  });
};

module.exports = {
  crearPedidoCliente,
  obtenerPedidoPorMesa,
};
