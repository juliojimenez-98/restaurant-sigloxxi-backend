const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const Rol = require("../models/rol");

obtenerUsuarios = async (req, res = response) => {
  const usuarios = await Usuario.findAll({
    include: Rol,
  });

  res.json({ usuarios });
};

const crearUsuario = async (req, res = response) => {
  const { body } = req;
  try {
    const emailExists = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExists) {
      return res.status(404).json({
        msg: `El usuario con email: ${body.email} ya esta registrado`,
      });
    }

    const usuario = new Usuario(body);

    body.password = body.email.split("@")[0];

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(body.password, salt);

    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
};
