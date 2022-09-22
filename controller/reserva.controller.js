const { response } = require("express");
const { Op } = require("sequelize");
const { body } = require("express-validator");
const Mesa = require("../models/mesa");
const Reserva = require("../models/reserva");
const Cliente = require("../models/cliente");

const obtenerReservas = async (req, res = response) => {
  try {
    const reservas = await Reserva.findAll({ include: Cliente });
    res.json({ reservas });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const crearReserva = async (req, res = response) => {
  const { body } = req;

  const mesaDisp = await Mesa.findOne({
    where: {
      [Op.and]: [
        { cant_sillas: req.body.cant_personas },
        { disponibilidad: 0 },
      ],
    },
  });
  if (mesaDisp) {
    try {
      const { body } = req;

      const clienteExiste = await Cliente.findOne({
        where: {
          id_cliente: body.id_cliente,
        },
      });

      if (!clienteExiste) {
        return res.status(404).json({
          msg: `El cliente : ${body.id_cliente} No existe`,
        });
      }

      body.id_mesa = mesaDisp.id_mesa;

      const reserva = new Reserva(body);

      console.log(mesaDisp.id_mesa);

      await reserva.save();

      //Actualizar mesa para que disp. Sea en reserva

      const actDispMesa = await Mesa.update(
        { disponibilidad: 2 },
        {
          where: {
            id_mesa: mesaDisp.id_mesa,
          },
        }
      );

      res.status(200).json({ msg: "ok", reserva });
    } catch (error) {
      res.status(500).send({
        error,
      });
      console.log(error);
    }
  } else {
    res.status(404).json({
      msg: "No hay mesas disponibles para reservar",
    });
  }
};

module.exports = {
  crearReserva,
  obtenerReservas,
};
