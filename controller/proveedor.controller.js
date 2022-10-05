const { response } = require("express");
const Proveedor = require("../models/proveedor");

const crearProveedor = async (req, res = response) => {
    const { body } = req;
    try {
        const id_proveedorExists = await Proveedor.findOne({
            where: {
                id_proveedor: body.id_proveedor,
            },
        });

        if (id_proveedorExists) {
            return res.status(404).json({
                msg: `El proveedor con id: ${body.id_proveedor} ya está registrado`,
            });

        }

        const proveedor = new Proveedor(body);

        await proveedor.save();

        res.status(200).json({ msg: "ok", proveedor});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor",
        });
    }
};

const eliminarProveedor = async (req, res = response) => {
    const id_proveedor = req.params.id;
    const idInt = parseInt(id_proveedor);
    const proveedor = Proveedor.destroy({where: {id_proveedor: idInt} } );
    res.status(200).send({
        msg: `Proveedor eliminado con éxito`,
    });
};

obtenerProveedorPorId = async (req, res = response) => {
    const id_proveedor = req.params.id;
    const idInt = parseInt(id_proveedor);

    const findProveedor = await Proveedor.findOne({
        raw: true,
        where: {
            id_proveedor: idInt,
        },
    });
    res.status(200).json({
        findProveedor,
    });
};

obtenerProveedores = async (req, res = response) => {
    const proveedores = await Proveedor.findAll({});
    res.json({proveedores});
};

actualizarProveedor = async (req, res = response) => {
    const id = req.params.id;
    const idInt = parseInt(id);

    const findProveedor = await Proveedor.findOne({
        raw: true,
        where: {
            id_proveedor: idInt,
        },
    });

    const update = {};

    if(req.body.id_proveedor) update.id_proveedor = req.body.id_proveedor;
    if(req.body.nombre) update.nombre = req.body.nombre;
    if(req.body.tel_contacto) update.tel_contacto = req.body.tel_contacto;
    if(req.body.email) update.email = req.body.email;
    if(req.body.sitio_web) update.sitio_web = req.body.sitio_web;

    const updateProveedor = await Proveedor.update(update, {
        where: {
            id_proveedor: idInt,
        },
    });

    res.status(201).send({
        updateProveedor,
        update,
    });
};

module.exports = {
    crearProveedor,
    eliminarProveedor,
    obtenerProveedorPorId,
    obtenerProveedores,
    actualizarProveedor,
};
