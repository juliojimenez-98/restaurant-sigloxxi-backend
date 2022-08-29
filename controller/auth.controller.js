const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuarios = require("../models/usuario");

const { generateJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { rut, password } = req.body;

  try {
    const usuario = await Usuarios.findOne({
      where: {
        rut: rut,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con ese rut ${rut}`,
      });
    }

    // if (!usuario.estado) {
    //   return res.status(400).json({
    //     msg: "Usuario / password no son correctos - estado:false ",
    //   });
    // }

    //verificar contrasena

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "La contrasena es incorrecta",
      });
    }

    if (!validPassword) {
      return res.status(400).json({
        msg: "La contrasena es incorrecta",
      });
    }

    const token = await generateJWT(usuario.id);

    res.json({
      user: usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Algo salio mal",
    });
  }
};

module.exports = {
  login,
};
