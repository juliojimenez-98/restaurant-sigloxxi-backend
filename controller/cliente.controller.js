const { response } = require("express");
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

module.exports = {
  crearCliente,
};
