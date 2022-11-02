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
      const update = {};
      if (body.nombre) update.nombre = body.nombre;
      if (body.appa) update.appa = body.appa;
      if (body.cel) update.cel = body.cel;

      const updateCliente = await Cliente.update(update, {
        where: {
          id_cliente: emailExists.id_cliente,
        },
      });

      return res.status(201).json({
        msg: `ok`,
        updateCliente,
        update,
        email: emailExists.email,
        id_cliente: emailExists.id_cliente,
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

  const findCliente = await Cliente.findOne({
    where: {
      email: email,
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
