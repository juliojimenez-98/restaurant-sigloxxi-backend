const { response } = require("express");
const Mesa = require("../models/mesa");

const obtenerMesas = async (req, res = response) => {
  try {
    const mesas = await Mesa.findAll({ raw: true });
    res.json({ mesas });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const crearMesa = async (req, res = response) => {
  try {
    const { body } = req;

    const mesa = new Mesa(body);

    await mesa.save();

    res.status(200).json({ msg: "ok", mesa });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const actualizarMesa = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);

  const findMesa = await Mesa.findOne({
    raw: true,
    where: {
      id_mesa: idInt,
    },
  });

  if (!findMesa) {
    res.status(404).send({
      msg: `No existe la mesa con el id ${idInt}`,
    });
  }

  const update = {};

  if (req.body.cant_sillas) update.cant_sillas = req.body.cant_sillas;
  if (req.body.disponibilidad) update.disponibilidad = req.body.disponibilidad;

  const updateMesa = await Mesa.update(update, {
    where: {
      id_mesa: idInt,
    },
  });

  res.status(201).send({
    updateMesa,
    update,
  });
};

const eliminarMesa = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const mesa = await Mesa.destroy({ where: { id_mesa: idInt } });
  res.status(200).send({
    msg: `La mesa fue eliminada con exito`,
  });
};

module.exports = {
  crearMesa,
  obtenerMesas,
  actualizarMesa,
  eliminarMesa,
};
