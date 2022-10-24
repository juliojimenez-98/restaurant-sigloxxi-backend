const { response } = require("express");
const PedidoCliente = require("../models/pedidoCliente");
const Plato = require("../models/plato");

const crearPedidoCliente = async (req, res = response) => {
  try {
    const { tiempo_espera, cant, platos, id_mesa } = req.body;

    const platosArray = await Plato.findAll({
      where: { id_plato: platos },
    });
    console.log(platosArray);

    const pedidoCliente = new PedidoCliente({
      platos: platosArray,
      tiempo_espera,
      cant,
      id_mesa,
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

module.exports = {
  crearPedidoCliente,
};
