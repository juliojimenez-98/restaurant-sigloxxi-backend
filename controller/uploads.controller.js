const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const Plato = require("../models/plato");

const cargarArchivos = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }
  try {
    const nombreArchivo = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombreArchivo });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { tabla, id } = req.params;

  let modelo;

  switch (tabla) {
    case "plato":
      modelo = await Plato.findOne({
        where: {
          id_plato: id,
        },
      });

      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un plato con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  //limpiar imagenes previas
  if (modelo.img) {
    //Hay que borrar la img del servidor
    const pathImagen = path.join(__dirname, "../uploads", tabla, modelo.img);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, tabla);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

const actualizarImagenCloud = async (req, res = response) => {
  const { tabla, id } = req.params;

  let modelo;

  switch (tabla) {
    case "plato":
      modelo = await Plato.findOne({
        where: {
          id_plato: id,
        },
      });

      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un plato con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  //limpiar imagenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  console.log(tempFilePath);
  const { secure_url } = await cloudinary.uploader.upload(
    tempFilePath,
    (error, result) => {
      console.log(error);
    }
  );

  modelo.img = secure_url;

  await modelo.save();

  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { tabla, id } = req.params;

  let modelo;

  switch (tabla) {
    case "plato":
      modelo = await Plato.findOne({
        where: {
          id_plato: id,
        },
      });

      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un plato con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  if (modelo.img) {
    const pathImagen = path.join(__dirname, "../uploads", tabla, modelo.img);
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagenRelleno = path.join(__dirname, "../assets/no-image.png");
  res.sendFile(pathImagenRelleno);
};
module.exports = {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloud,
};
