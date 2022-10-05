const { response } = require("express");
const Receta = require("../models/receta");
const Ingredientes = require("../models/ingredientes");

const obtenerRecetas = async (req, res = response) => {
  try {
    const recetas = await Receta.findAll();

    res.json({ recetas });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const obtenerRecetaPorId = async (req, res = response) => {
  try {
    const id = req.params.id;
    const idInt = parseInt(id);
    const recetaFind = await Receta.findOne({
      where: {
        id_receta: idInt,
      },
    });
    res.json({ recetaFind });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const crearReceta = async (req, res = response) => {
  try {
    const { ingredientes, nombre_prep, id_ing, tiempo_prep, prep, tipo } =
      req.body;

    const ings = await Ingredientes.findAll({
      where: { id_ing: ingredientes },
    });

    const receta = new Receta({
      ingredientes: ings,
      nombre_prep,
      id_ing,
      tiempo_prep,
      prep,
      tipo,
    });
    console.log(typeof ings);

    await receta.save();

    res.status(200).json({ msg: "ok", receta });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const actualizarReceta = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const { body } = req;

  const findReceta = await Receta.findOne({
    raw: true,
    where: {
      id_receta: idInt,
    },
  });

  if (!findReceta) {
    res.status(404).send({
      msg: `No existe la receta con el id ${idInt}`,
    });
  }

  const update = {};

  if (body.nombre_prep) update.nombre_prep = body.nombre_prep;
  if (body.prep) update.prep = body.prep;
  if (body.tiempo_prep) update.tiempo_prep = body.tiempo_prep;
  if (body.id_ing) update.id_ing = body.id_ing;
  if (body.ingredientes) {
    const ings = await Ingredientes.findAll({
      where: { id_ing: body.ingredientes },
    });
    body.ingredientes = ings;
    update.ingredientes = body.ingredientes;
  }

  const updateReceta = await Receta.update(update, {
    where: {
      id_receta: idInt,
    },
  });

  res.status(201).json({
    updateReceta,
    update,
  });
};

const eliminarReceta = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const receta = await Receta.destroy({ where: { id_receta: idInt } });
  res.status(200).send({
    msg: `La receta fue eliminada con exito`,
  });
};

module.exports = {
  crearReceta,
  obtenerRecetas,
  actualizarReceta,
  eliminarReceta,
  obtenerRecetaPorId,
};
