const { response } = require("express");
const Ingredientes = require("../models/ingredientes");

const obtenerIngredientePorId = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);

  const findIngrediente = await Ingredientes.findOne({
    raw: true,
    where: {
      id_ing: idInt,
    },
  });
  res.status(200).json({
    findIngrediente,
  });
};

const obtenerIngredientes = async (req, res = response) => {
  try {
    const ingrediente = await Ingredientes.findAll({ raw: true });
    res.json({ ingrediente });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const obtenerIngredientesPaginado = async (req, res = response) => {
  const dsd = req.params.desde;
  const desde = parseInt(dsd);
  const lmt = req.params.limite;
  const limite = parseInt(lmt);

  try {
    const ingrediente = await Ingredientes.findAll({
      limit: limite,
      offset: desde,
    });
    res.json({ ingrediente });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const crearIngrediente = async (req, res = response) => {
  try {
    const { body } = req;

    const ingrediente = new Ingredientes(body);

    await ingrediente.save();

    res.status(200).json({ msg: "ok", ingrediente });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const actualizarIngrediente = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const { body } = req;

  const findIngrediente = await Ingredientes.findOne({
    raw: true,
    where: {
      id_ing: idInt,
    },
  });

  if (!findIngrediente) {
    res.status(404).send({
      msg: `No existe el ingrediente con el id ${idInt}`,
    });
  }

  const update = {};

  if (body.nombre) update.nombre = body.nombre;
  if (body.stock) update.stock = body.stock;
  if (body.unidad) update.unidad = body.unidad;
  if (body.stock_cri) update.stock_cri = body.stock_cri;
  if (body.fecha_vencimiento) update.fecha_vencimiento = body.fecha_vencimiento;

  const updateIng = await Ingredientes.update(update, {
    where: {
      id_ing: idInt,
    },
  });

  res.status(201).json({
    updateIng,
    update,
  });
};

const eliminarIngrediente = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  const ingrediente = await Ingredientes.destroy({ where: { id_ing: idInt } });
  res.status(200).send({
    msg: `El ingrediente fue eliminado con exito`,
  });
};

module.exports = {
  crearIngrediente,
  actualizarIngrediente,
  obtenerIngredientes,
  obtenerIngredientePorId,
  eliminarIngrediente,
  obtenerIngredientesPaginado,
};
