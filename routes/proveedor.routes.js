const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearProveedor,
    eliminarProveedor,
    obtenerProveedores,
    obtenerProveedorPorId,
    actualizarProveedor,
} = require("../controller/proveedor.controller");

const { validarCampos } = require("../middlewares/validar-campos");
//const { route } = require("./auth.routes");

const router = Router();

//Obtener todos los proveedores
router.get("/proveedores", obtenerProveedores);

//Obtener proveedores por id
router.get("/proveedor/:id", obtenerProveedorPorId);

//Crear Proveedor
router.post(
    "/proveedor",
    [
        check("nombre","el nombre es obligatorio").not().isEmpty(),
        check("tel_contacto","el teléfono es obligatorio").not().isEmpty(),
        check("email","el email es obligatorio").not().isEmpty(),
        check("sitio_web","el sitio web es obligatorio").not().isEmpty(),
        validarCampos
    ],
    crearProveedor
);

//Eliminar Proveedor
router.delete("/proveedor/:id", eliminarProveedor);

//Actualizar Proveedor
router.put("/proveedor/:id", actualizarProveedor);

module.exports = router;