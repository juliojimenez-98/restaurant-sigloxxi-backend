const { response } = require("express");
const { Op, json } = require("sequelize");
const Bebestibles = require("../models/bebestibles");
const PedidoCliente = require("../models/pedidoCliente");
const Plato = require("../models/plato");
const Receta = require("../models/receta");

const crearPedidoCliente = async (req, res = response) => {
  try {
    const { tiempo_espera, cant, platos, bebestibles, id_mesa, estado } =
      req.body;

    var totalPlatos = 0;
    if (platos) {
      platos.forEach(function (a) {
        totalPlatos += a[0].precio * a[1];
      });
    }
    console.log(totalPlatos);

    var totalBebestibles = 0;
    if (bebestibles) {
      bebestibles.forEach(function (a) {
        totalPlatos += a[0].precio * a[1];
      });
    }

    var totalFinal = totalBebestibles + totalPlatos;

    const pedidoCliente = new PedidoCliente({
      platos,
      bebestibles,
      tiempo_espera,
      cant,
      total: totalFinal,
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

const obtenerPedidos = async (req, res = response) => {
  const pedidos = await PedidoCliente.findAll();
  res.json({ pedidos });
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
  obtenerPedidos,
};
