const { response } = require("express");
const { Op, json } = require("sequelize");
const Bebestibles = require("../models/bebestibles");
const PedidoCliente = require("../models/pedidoCliente");
const Plato = require("../models/plato");
const Receta = require("../models/receta");

const crearPedidoCliente = async (req, res = response) => {
  try {
    const { tiempo_espera, cant, platos, bebestibles, id_mesa, estado } =
      req.body;

    var totalPlatos = 0;
    if (platos) {
      platos.forEach(function (a) {
        totalPlatos += a[0].precio * a[1];
      });
    }
    console.log(totalPlatos);

    var totalBebestibles = 0;
    if (bebestibles) {
      bebestibles.forEach(function (a) {
        totalPlatos += a[0].precio * a[1];
      });
    }

    var totalFinal = totalBebestibles + totalPlatos;

    const pedidoCliente = new PedidoCliente({
      platos,
      bebestibles,
      tiempo_espera,
      cant,
      total: totalFinal,
      id_mesa,
      estado,
    });

    await pedidoCliente.save();

    res.status(200).json({ msg: "ok", pedidoCliente });
  } catch (error) {
    res.status(500).send({
      error,
    });
    console.log(error);
  }
};

const actualizarPedido = async (req, res = response) => {
   const id = req.params.id;
   const idInt = parseInt(id);

   const findPedido = await PedidoCliente.findOne({
     where: {
       id_orden: idInt,
     },
   });

   if (!findPedido) {
      res.status(400).json({
        msg:"No existe pedido con ese ID"
      })
   }

   

   const update = {};

   
   if (req.body.bebestibles) update.bebestibles = req.body.bebestibles;
   if (req.body.id_orden) update.platos = req.body.platos;
   if (req.body.tiempo_espera) update.platos = req.body.platos;
   if (req.body.cant) update.platos = req.body.platos;
   if (req.body.estado) update.platos = req.body.platos;
   if (req.body.platos) update.platos = req.body.platos;
   if (req.body.id_mesa) update.platos = req.body.platos;



   var totalPlatos = 0;
    if (req.body.platos) {
      req.body.platos.forEach(function (a) {
      console.log(a);
        totalPlatos += a[0].precio * a[1];
      });
    }

   var totalBebestibles = 0;
   if (req.body.bebestibles) {
     req.body.bebestibles.forEach(function (a) {
      console.log(a)
       totalBebestibles += a[0].precio * a[1];
     });
   }

   console.log(totalBebestibles,"bebestibles", totalPlatos, "totalPlatos")

   var totalFinal = totalBebestibles + totalPlatos;
   update.total = totalFinal





    const updatePlato = await PedidoCliente.update(update, {
      where: {
        id_orden: idInt,
      },
    });

   res.status(201).send({
     msg: "ok",
     updatePlato,
     update,
   });
}


const obtenerPedidos = async (req, res = response) => {
  const pedidos = await PedidoCliente.findAll({
    where:{
      estado:1
    }
  });
  res.json({ pedidos });
};

const obtenerPedidoPorMesa = async (req, res = response) => {
  const id = req.params.id_mesa;
  const idInt = parseInt(id);

  const findPedido = await PedidoCliente.findOne({
    where: {
      [Op.and]: [{ id_mesa: idInt }, { estado: 1 }],
    },
  });

  res.status(200).json({
    findPedido,
  });
};

const obtenerPedidoPorId = async (req, res = response) => {
  const id = req.params.id;
  const idInt = parseInt(id);

  const findPedido = await PedidoCliente.findOne({
    where: {
       id_orden: idInt 
    },
  });

  res.status(200).json({
    findPedido,
  });
};


module.exports = {
  crearPedidoCliente,
  obtenerPedidoPorMesa,
  obtenerPedidos,
  actualizarPedido,
  obtenerPedidoPorId,
};
