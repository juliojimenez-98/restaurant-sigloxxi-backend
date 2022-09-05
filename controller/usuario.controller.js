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

obtenerRoles = async (req, res = response) => {
  const roles = await Rol.findAll({ raw: true });

  // const usuarios = await Usuario.findAll({ raw: true });
  // var isAdminRole = false;
  // usuarios.map((user) => {
  //   var array = user.rolArray.split(",");
  //   console.log(array);
  //   if (array.find((element) => element === "1")) {
  //     isAdminRole = true;
  //     console.log("correcto");
  //   }
  //   array.find((element) => console.log(element, "prueba"));
  //   console.log(isAdminRole);
  // });
  // const rolesDelUser = await Rol.findByPk(1);
  // console.log(rolesDelUser);
  // res.json({ usuarios });
  res.json({ roles });
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

    const rolExists = await Rol.findOne({
      where: {
        id_rol: body.id_rol,
      },
    });

    if (!rolExists) {
      return res.status(404).json({
        msg: `El rol : ${body.id_rol} No existe`,
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
  obtenerRoles,
};
