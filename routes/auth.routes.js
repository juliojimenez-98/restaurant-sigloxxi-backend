const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controller/auth.controller");

const router = Router();

router.post("/login", login),
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contrasena es obligatoria").not().isEmpty(),
  ];

module.exports = router;
