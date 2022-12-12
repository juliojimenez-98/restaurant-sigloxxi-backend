const { response } = require("express");
const { Op } = require("sequelize");
const Ingredientes = require("../models/ingredientes");
const Mesa = require("../models/mesa");
const Plato = require("../models/plato");
const Usuario = require("../models/usuario");
const Bebestible = require("../models/bebestibles");
const Cliente = require("../models/cliente");
const Medio_pago = require("../models/medio_pago");
const Pedido_ingrediente = require("../models/pedido_ing");
const Pedido_cliente = require("../models/pedidoCliente");
const Receta = require("../models/receta");
const Recibo_pedido = require("../models/recibo_pedido");
const Reserva = require("../models/reserva");
const Rol = require("../models/rol");
const Venta = require("../models/venta");
const Proveedor = require("../models/proveedor");

const tablasExistentes = [
  "mesas",
  "ingredientes",
  "platos",
  "usuarios",
  "proveedores",
  "bebestibles",
  "clientes",
  "medio_pagos",
  "pedidos_ingredientes",
  "pedidos_clientes",
  "recetas",
  "recibos_pedidos",
  "reservas",
  "roles",
  "ventas",
];

const buscarUsuarios = async (termino = "", res = response) => {
  const usuarios = await Usuario.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: "%" + termino + "%" } },
        { email: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: usuarios,
  });
};

const buscarIngredientes = async (termino = "", res = response) => {
  const ingredientes = await Ingredientes.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: "%" + termino + "%" } },
        { stock: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: ingredientes,
  });
};

const buscarMesas = async (termino = "", res = response) => {
  const mesas = await Mesa.findAll({
    where: {
      [Op.or]: [
        { cant_sillas: { [Op.like]: "%" + termino + "%" } },
        { id_mesa: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: mesas,
  });
};

const buscarPlatosPorTipo = async (termino = "", res = response) => {
  const mesas = await Plato.findAll({
    include: {
      model: Receta,
      where: {
        nombre_prep: { [Op.like]: "%" + termino + "%" },
      },
    },
  });

  res.json({
    results: mesas,
  });
};

const buscarBebestibles = async (termino = "", res = response) => {
  const bebestibles = await Bebestible.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: "%" + termino + "%" } },
        { stock: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: bebestibles,
  });
};

const buscarClientes = async (termino = "", res = response) => {
  const clientes = await Cliente.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: "%" + termino + "%" } },
        { email: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: clientes,
  });
};

const buscarPedidosIngredientes = async (termino = "", res = response) => {
  const pedidos_ingredientes = await Pedido_ingrediente.findAll({
    where: {
      [Op.or]: [
        { estado: { [Op.like]: "%" + termino + "%" } },
        { id_pedido: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: pedidos_ingredientes,
  });
};

const buscarPedidosClientes = async (termino = "", res = response) => {
  const pedidos_clientes = await Pedido_cliente.findAll({
    where: {
      [Op.or]: [
        { tiempo_espera: { [Op.like]: "%" + termino + "%" } },
        { id_orden: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: pedidos_clientes,
  });
};

const buscarRecetas = async (termino = "", res = response) => {
  const recetas = await Receta.findAll({
    where: {
      [Op.or]: [
        { nombre_prep: { [Op.like]: "%" + termino + "%" } },
        { prep: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: recetas,
  });
};

const buscarRecibosPedidos = async (termino = "", res = response) => {
  const recibos_pedidos = await Recibo_pedido.findAll({
    where: {
      [Op.or]: [
        { estado: { [Op.like]: "%" + termino + "%" } },
        { id_recibo: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: recibos_pedidos,
  });
};

const buscarReservas = async (termino = "", res = response) => {
  const reservas = await Reserva.findAll({
    where: {
      [Op.or]: [
        { id_reserva: { [Op.like]: "%" + termino + "%" } },
        { hora_reserva: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: reservas,
  });
};

const buscarRoles = async (termino = "", res = response) => {
  const roles = await Rol.findAll({
    where: {
      [Op.or]: [
        { nom_rol: { [Op.like]: "%" + termino + "%" } },
        { id_rol: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: roles,
  });
};

const buscarVentas = async (termino = "", res = response) => {
  const ventas = await Venta.findAll({
    where: {
      [Op.or]: [
        { desc_venta: { [Op.like]: "%" + termino + "%" } },
        { monto: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    results: ventas,
  });
};

const buscarProveedores = async (termino = "", res = response) => {
  const proveedores = await Proveedor.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.like]: "%" + termino + "%" } },
        { email: { [Op.like]: "%" + termino + "%" } },
      ],
    },
  });

  res.json({
    result: proveedores,
  });
};

const buscar = (req, res = response) => {
  const { tabla, termino } = req.params;

  if (!tablasExistentes.includes(tabla)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${tablasExistentes}`,
    });
  }
  switch (tabla) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "ingredientes":
      buscarIngredientes(termino, res);
      break;
    case "mesas":
      buscarMesas(termino, res);
      break;
    case "platos":
      buscarPlatosPorTipo(termino, res);
      break;
    case "bebestibles":
      buscarBebestibles(termino, res);
      break;
    case "clientes":
      buscarClientes(termino, res);
      break;
    case "medio_pagos":
      buscarMedios(termino, res);
      break;
    case "pedidos_ingredientes":
      buscarPedidosIngredientes(termino, res);
      break;
    case "pedidos_clientes":
      buscarPedidosClientes(termino, res);
      break;
    case "recetas":
      buscarRecetas(termino, res);
      break;
    case "recibos_pedidos":
      buscarRecibosPedidos(termino, res);
      break;
    case "reservas":
      buscarReservas(termino, res);
      break;
    case "ventas":
      buscarVentas(termino, res);
      break;
    case "roles":
      buscarRoles(termino, res);
      break;
    case "proveedores":
      buscarProveedores(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "No hizo la busqueda de coleccion",
      });
      break;
  }
};
module.exports = {
  buscar,
};
