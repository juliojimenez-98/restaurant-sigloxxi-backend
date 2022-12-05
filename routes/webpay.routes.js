const { Router } = require("express");
const { check } = require("express-validator");
const { pagar } = require("../controller/webpay.controller");

//const { route } = require("./auth.routes");

const router = Router();

//Obtener todos los proveedores
router.post("/webpay/pagar", pagar);


module.exports = router;
