// const { Router } = require("express");
// const { check } = require("express-validator");
// const {
//     crearVenta,
//     obtenerVentas,
//     eliminarVenta,
//     actualizarVenta,
// } = require("../controller/venta.controller");
// const { validarCampos } = require("../middlewares/validar-campos");


// const router = Router();

// //Crear Venta
// router.post(
//     "/venta",
//     [
//     check("monto", "el monto es obligatorio").not().isEmpty(),
//     check("iva", "el IVA es obligatorio").not().isEmpty(),
//     check("desc_venta", "la descripción de la venta es obligatorio").not().isEmpty(),
//     check("id_orden", "el n° de orden es obligatorio").not().isEmpty(),
//     check("id_pago", "el medio de pago es obligatorio").not().isEmpty(),
//     validarCampos,
//     ],
//     crearVenta
// );

// //Actualizar venta
// router.put("/venta/:id", actualizarVenta);

// //Eliminar Venta
// router.delete("/venta/:id", eliminarVenta);

// //Obtener ventas
// router.get("/ventas", obtenerVentas);

// module.exports = router;
const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearVenta,
    eliminarVenta,
    obtenerVentas,
    actualizarVenta,
} = require("../controller/venta.controller");

const { validarCampos } = require("../middlewares/validar-campos");
//const { route } = require("./auth.routes");

const router = Router();

//Obtener todos los proveedores
router.get("/ventas", obtenerVentas);

//Crear Proveedor
router.post(
    "/venta",
    [
    check("monto", "el monto es obligatorio").not().isEmpty(),
    check("iva", "el IVA es obligatorio").not().isEmpty(),
    check("desc_venta", "la descripción de la venta es obligatorio").not().isEmpty(),
    check("id_orden", "el n° de orden es obligatorio").not().isEmpty(),
    check("id_pago", "el medio de pago es obligatorio").not().isEmpty(),
    validarCampos,
    ],
    crearVenta
);

module.exports = router;