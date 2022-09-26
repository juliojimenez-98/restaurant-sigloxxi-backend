const { response } = require("express");
const Receta = require("../models/receta");

const obtenerRecetas = async (req, res = response) => {
  try {
    const recetas = await Receta.findAll({ raw: true });
    res.json({ recetas });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const crearReceta = async (req, res = response) => {
  try {
    const { body } = req;

    const receta = new Receta(body);

    await receta.save();

    res.status(200).json({ msg: "ok", receta });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

module.exports = {
  crearReceta,
  obtenerRecetas,
};
