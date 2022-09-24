const { response } = require("express");
const { Op } = require("sequelize");
const Usuario = require("../models/usuario");

const tablasExistentes = ["bodegas", "productos", "role", "usuarios"];

const buscarUsuarios = async (termino = "", res = response) => {
  const usuarios = await Usuario.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: "%" + termino + "%" } },
        { email: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: usuarios,
  });
};

const buscar = (req, res = response) => {
  const { tabla, termino } = req.params;

  if (!tablasExistentes.includes(tabla)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${tablasExistentes}`,
    });
  }
  switch (tabla) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "bodegas":
      buscarBodegas(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No hizo la busqueda de coleccion",
      });
      break;
  }
};
module.exports = {
  buscar,
};
