const { response } = require("express");
const { Op } = require("sequelize");
const Cliente = require("../models/cliente");

const crearCliente = async (req, res = response) => {
  const { body } = req;
  try {
    const emailExists = await Cliente.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExists) {
      return res.status(404).json({
        msg: `El cliente con email: ${body.email} ya esta registrado`,
      });
    }

    const cliente = new Cliente(body);

    await cliente.save();

    res.status(200).json({ msg: "ok", cliente });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const obtenerClienteParaReserva = async (req, res = response) => {
  const email = req.params.email;
  const cel = req.params.cel;

  const findCliente = await Cliente.findOne({
    where: {
      [Op.and]: [{ email: email }, { cel: cel }],
    },
  });
  res.status(200).json({
    findCliente,
  });
};

module.exports = {
  crearCliente,
  obtenerClienteParaReserva,
};
