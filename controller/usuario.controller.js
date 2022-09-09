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

    res.status(200).json({ msg: "ok", usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const updatePassNewUser = async (req = request, res = response) => {
  const id = req.params.id;
  const { password } = req.body;
  const idInt = parseInt(id);

  const findUser = await Usuario.findOne({
    raw: true,
    where: {
      id_user: idInt,
    },
  });

  if (!findUser) {
    res.status(404).send({
      status: "error",
      msg: `El usuario con id ${idInt} no existe`,
    });
  }

  const update = {};
  if (findUser.estado === 2) {
    update.estado = 1;
  }

  if (password) update.password = password;

  const salt = bcryptjs.genSaltSync();
  update.password = bcryptjs.hashSync(password, salt);

  const updateUser = await Usuario.update(update, {
    where: {
      id_user: idInt,
    },
  });

  if (!updateUser) {
    res.status(404).send({
      status: "error",
      msg: "Error al actualizar",
    });
  }

  res.status(201).send({
    status: "exito",
    updateUser,
  });
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerRoles,
  updatePassNewUser,
};
