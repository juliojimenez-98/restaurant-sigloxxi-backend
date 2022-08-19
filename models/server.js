const express = require("express");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Conexion DB
    this.conectarDB();
    //Middleweres
    this.middleweres();
    //Rutas
    this.routes();
  }

  async conectarDB() {
    try {
      await dbConnection.authenticate();
      console.log("Se ha conectado correctamente a la base de datos");
    } catch (error) {
      console.error("Error no se pudo conectar a la base de datos", error);
    }
  }

  middleweres() {}

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello world");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
