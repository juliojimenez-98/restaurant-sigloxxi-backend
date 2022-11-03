const { response } = require("express");
const { Op } = require("sequelize");
const Bebestibles = require("../models/bebestibles");
const PedidoCliente = require("../models/pedidoCliente");
const Plato = require("../models/plato");

const crearPedidoCliente = async (req, res = response) => {
  try {
    const { tiempo_espera, cant, platos, bebestibles, id_mesa, estado } =
      req.body;

    if (bebestibles) {
      var bebestiblesArray = await Bebestibles.findAll({
        where: { id_bebida: bebestibles },
      });
    }

    if (platos) {
      var platosArray = await Plato.findAll({
        where: { id_plato: platos },
      });
    }

    var totalBebestibles = 0;
    if (bebestibles) {
      bebestiblesArray.forEach(function (a) {
        totalBebestibles += a.precio;
      });
    }
    var totalPlatos = 0;
    platosArray.forEach(function (a) {
      totalPlatos += a.precio;
    });

    var totalFinal = totalBebestibles + totalPlatos;

    const pedidoCliente = new PedidoCliente({
      platos: platosArray,
      bebestibles: bebestiblesArray,
      tiempo_espera,
      cant,
      id_mesa,
      estado,
      total: totalFinal,
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
