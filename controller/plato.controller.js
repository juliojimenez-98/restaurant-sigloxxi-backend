const { response } = require("express");
const Plato = require("../models/plato");
const Receta = require("../models/receta");

const obtenerPlatos = async (req, res = response) => {
  const tipo = req.params.tipo;
  const tipoPlato = parseInt(tipo);
  try {
    const platos = await Plato.findAll({
      include: Receta,
      where: {
        tipo_plato: tipoPlato,
      },
    });
    res.json({ platos });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const obtenerPlatoPorId = async (req, res = response) => {
  try {
    const id = req.params.id;
    const idInt = parseInt(id);
    const platoFind = await Plato.findOne({
      where: {
        id_plato: idInt,
      },
    });
    res.json({ platoFind });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const crearPlato = async (req, res = response) => {
  try {
    const { body } = req;

    const plato = new Plato(body);

    await plato.save();

    res.status(200).json({ msg: "ok", plato });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const actualizarPlato = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);

  const findPlato = await Plato.findOne({
    raw: true,
    where: {
      id_plato: idInt,
    },
  });

  if (!findPlato) {
    res.status(404).send({
      msg: `No existe el plato con el id ${idInt}`,
    });
  }

  const update = {};

  if (req.body.desc) update.desc = req.body.desc;
  if (req.body.precio) update.precio = req.body.precio;
  if (req.body.estado) update.estado = req.body.estado;
  if (req.body.id_receta) update.id_receta = req.body.id_receta;

  const updatePlato = await Plato.update(update, {
    where: {
      id_plato: idInt,
    },
  });

  res.status(201).send({
    updatePlato,
    update,
  });
};

const eliminarPlato = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const plato = await Plato.destroy({ where: { id_plato: idInt } });
  res.status(200).send({
    msg: `El plato fue eliminado con exito`,
  });
};

module.exports = {
  crearPlato,
  obtenerPlatos,
  actualizarPlato,
  obtenerPlatoPorId,
  eliminarPlato,
};
