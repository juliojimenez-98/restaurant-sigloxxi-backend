const { response } = require("express");
const Venta = require("../models/venta");
const pedidoCliente = require("../models/pedidoCliente");
const Medio_pago = require("../models/medio_pago");

const crearVenta = async(req, res = response) => {
    const { body } = req;
    try{
        const id_ventaExists = await Venta.findOne({
            where: {
                id_venta: body.venta,
            },
        });

        if (id_ventaExists) {
            return res.status(404).json({
                msg: `La venta con id ${body.venta} ya existe`
            });
        }

 //       const id_ordenExists = await Pedido_cliente.findOne({
     //        where: {
       //          id_orden: body.id_orden,
       //      },
       //  });

      //   if (!id_ordenExists) {
       //      return res.status(404).json({
        //         msg: `La orden: ${body.id_orden} no existe`,
        //     });
        // }

        const id_pagoExists = await Medio_pago.findOne({
            where: {
                id_pago: body.id_pago,
            },
        });

        if (!id_pagoExists) {
            return res.status(404).json({
                msg: `El medio de pago: ${body.id_pago} no existe`,
            });
        }

        const venta = new Venta(body);
        await venta.save();

        res.status(200).json({ msg: "ok", venta});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor",
        });
    }
};

const eliminarVenta = async (req, res = response) => {
    const id = req.params.id;
    const idInt = parseInt(id);
    const venta = await Venta.destroy({where:{ id_venta: idInt}});
    res.status(200).send({
        msg: `Venta eliminada con éxito`,
        venta,
    });
};

const obtenerVentas = async(req, res = response) => {
    const ventas = await Venta.findAll();
    res.json({ ventas });
};

const actualizarVenta = async(req, res = response) => {
    const id = req.params.id;
    const idInt = parseInt(id);

    const findVenta = await Venta.findOne({
        raw: true,
        where: {
            id_venta: idInt,
        },
    });

    const update = {};

    if (req.body.medio_pago) update.medio_pago = req.body.medio_pago;
    if (req.body.monto) update.monto = req.body.monto;
    if (req.body.iva) update.iva = req.body.iva;
    if (req.body.desc_venta) update.desc_venta = req.body.desc_venta;
    if (req.body.id_pago) update.id_pago = req.body.id_pago;

    const updateVenta = await Venta.update(update, {
        where: {
            id_venta: idInt,
        },
    });

    res.status(201).send({
        updateVenta,
        update,
    });
};

module.exports = {
    crearVenta,
    eliminarVenta,
    obtenerVentas,
    actualizarVenta,
};