const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloud,
} = require("../controller/uploads.controller");
const { tablasPermitidas } = require("../helpers/db-validators");
const { validarArchivoASubir } = require("../middlewares/validar-archivo");

const router = Router();

router.post("/", cargarArchivos);
router.put(
  "/:tabla/:id",
  [
    validarArchivoASubir,
    (check("tabla").custom((c) => tablasPermitidas(c, ["plato","bebestibles"])),
    validarCampos),
  ],
  actualizarImagenCloud
);
router.get(
  "/:tabla/:id",
  [
    (check("tabla").custom((c) => tablasPermitidas(c, ["plato","bebestibles"])),
    validarCampos),
  ],
  mostrarImagen
);

module.exports = router;
