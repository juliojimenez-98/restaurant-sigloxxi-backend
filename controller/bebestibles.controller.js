const { response } = require("express");
const Bebestibles = require("../models/bebestibles");

const crearBebestible = async (req, res = response) => {
  const { body } = req;
  try {
    const bebestibles = new Bebestibles(body);
    await bebestibles.save();

    res.status(200).json({ msg: "ok", bebestibles });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const eliminarBebestible = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const bebestibles = await Bebestibles.destroy({
    where: { id_bebida: idInt },
  });
  res.status(200).send({
    msg: `Bebestible eliminado con éxito`,
    bebestibles,
  });
};

const obtenerBebestiblePorId = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const bebestible = await Bebestibles.findOne({
    where: { id_bebida: idInt },
  });
  res.json({
    bebestible,
  });
};

const obtenerBebestible = async (req, res = response) => {
  const bebestibles = await Bebestibles.findAll();
  res.json({ bebestibles });
};

const actualizarBebestible = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const { body } = req;

  const findBebestible = await Bebestibles.findOne({
    raw: true,
    where: {
      id_bebida: idInt,
    },
  });

  if (!findBebestible) {
    res.status(404).send({
      msg: `No existe el bebestible con id ${idInt}`,
    });
  }

  const update = {};

  if (body.nombre) update.nombre = body.nombre;
  if (body.precio) update.precio = body.precio;
  if (body.stock) update.stock = body.stock;
  if (body.stock_cri) update.stock_cri = body.stock_cri;
  if (body.unidad) update.unidad = body.unidad;
  if (body.fecha_vencimiento) update.fecha_vencimiento = body.fecha_vencimiento;
  if (body.id_orden) update.id_orden = body.id_orden;

  const updateBebestible = await Bebestibles.update(update, {
    where: {
      id_bebida: idInt,
    },
  });

  res.status(201).json({
    updateBebestible,
    update,
  });
};

module.exports = {
  crearBebestible,
  obtenerBebestible,
  eliminarBebestible,
  actualizarBebestible,
  obtenerBebestiblePorId,
};
