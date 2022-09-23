const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.authPath = "/api";
    this.clientesPath = "/api/clientes";
    this.mesasPath = "/api/mesas";
    this.ingredientesPath = "/api/ingredientes";
    this.reservaPath = "/api/reserva";
    this.usuariosPath = "/api/usuarios";

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

  middleweres() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.usuariosPath, require("../routes/usuario.routes"));
    this.app.use(this.mesasPath, require("../routes/mesas.routes"));
    this.app.use(this.reservaPath, require("../routes/reserva.routes"));
    this.app.use(this.clientesPath, require("../routes/cliente.routes"));
    this.app.use(
      this.ingredientesPath,
      require("../routes/ingrediente.routes")
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
