const { response } = require("express");
const Ingredientes = require("../models/ingredientes");

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

module.exports = {
  crearIngrediente,
  actualizarIngrediente,
};
