const { response } = require("express");
const { Op } = require("sequelize");
const Ingredientes = require("../models/ingredientes");
const Mesa = require("../models/mesa");
const Plato = require("../models/plato");
const Usuario = require("../models/usuario");
//const Proveedor = require("../models/proveedor");

const tablasExistentes = [
  "mesas",
  "ingredientes",
  "platos",
  "usuarios",
  "proveedores",
];

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

//const buscarProveedores = async(termino = "", res = response) => {
//const proveedores = await Proveedor.findAll({
//where: {
//[Op.or]: [
// { id_proveedor: {[Op.like]: "%" + termino + "%"}},
// { nombre:{ [Op.like]: "%" + termino + "%" } },
// { tel_contacto: {[Op.like]: "%" + termino + "%"}},
// { email: {[Op.like]: "%" + termino + "%"}},
//],
//},
//});
//};

const buscarIngredientes = async (termino = "", res = response) => {
  const ingredientes = await Ingredientes.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: "%" + termino + "%" } },
        { stock: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: ingredientes,
  });
};

const buscarMesas = async (termino = "", res = response) => {
  const mesas = await Mesa.findAll({
    where: {
      [Op.or]: [
        { cant_sillas: { [Op.like]: "%" + termino + "%" } },
        { id_mesa: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: mesas,
  });
};

const buscarPlatosPorTipo = async (termino = "", res = response) => {
  const mesas = await Plato.findAll({
    where: {
      tipo_plato: { [Op.like]: "%" + termino + "%" },
    },
  });

  res.json({
    results: mesas,
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
    case "ingredientes":
      buscarIngredientes(termino, res);
      break;
    case "mesas":
      buscarMesas(termino, res);
      break;
    case "platos":
      buscarPlatosPorTipo(termino, res);
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
