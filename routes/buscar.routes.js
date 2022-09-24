const { Router } = require("express");
const { buscar } = require("../controller/buscar.controller");

const router = Router();

router.get("/:tabla/:termino", buscar);

module.exports = router;
