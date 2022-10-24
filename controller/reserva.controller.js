const { response } = require("express");
const { Op } = require("sequelize");
const { body } = require("express-validator");
const Mesa = require("../models/mesa");
const Reserva = require("../models/reserva");
const Cliente = require("../models/cliente");
const { transporter } = require("../helpers/handlebars");
const moment = require("moment/moment");

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
      console.log({
        name: `${clienteExiste.nombre} ${clienteExiste.appa}`,
        fecha: `${moment().format("LL", reserva.fecha_reserva)}`,
        hora: `${reserva.hora_reserva}`,
      });

      res.status(200).json({ msg: "ok", reserva });

      var mailOptions = {
        from: process.env.USER_GMAIL,
        to: clienteExiste.email,
        subject: "Reserva exitosa Restaurant Siglo XXI",
        template: "registroReserva",
        context: {
          name: `${clienteExiste.nombre} ${clienteExiste.appa}`,
          fecha: `${moment().format("LL", reserva.fecha_reserva)}`,

          hora: `${reserva.hora_reserva}`,
        },
      };

      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("info.messageId: " + info.messageId);
          console.log("info.envelope: " + info.envelope);
          console.log("info.accepted: " + info.accepted);
          console.log("info.rejected: " + info.rejected);
          console.log("info.pending: " + info.pending);
          // console.log("info.response: " + info.response);
        }
        transporter.close();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error en el servidor",
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
