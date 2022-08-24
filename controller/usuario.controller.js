const { response } = require("express");
const Usuarios = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const crearUsuario = async (req, res = response) => {
  const { body } = req;
  try {
    const rutExists = await Usuarios.findOne({
      where: {
        rut: body.rut,
      },
    });

    if (rutExists) {
      return res.status(404).json({
        msg: `El usuario con rut: ${body.rut} ya esta registrado`,
      });
    }

    const usuarios = new Usuarios(body);

    usuarios.password = body.rut;

    await usuarios.save();

    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  crearUsuario,
};
