const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.authPath = "/api";
    this.buscar = "/api/buscar";
    this.clientesPath = "/api/clientes";
    this.mesasPath = "/api/mesas";
    this.ingredientesPath = "/api/ingredientes";
    this.platosPath = "/api/platos";
    this.recetasPath = "/api/recetas";
    this.reservaPath = "/api/reserva";
    this.usuariosPath = "/api/usuarios";
    this.proveedoresPath = "/api/proveedores";
    this.pedido_ingPath = "/api/pedido_ing";
    this.pedido_ingPath = "/api/pedido_ing";


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

    //carga de archivos

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.buscar, require("../routes/buscar.routes"));
    this.app.use(this.clientesPath, require("../routes/cliente.routes"));
    this.app.use(this.mesasPath, require("../routes/mesas.routes"));
    this.app.use(this.platosPath, require("../routes/platos.routes"));
    this.app.use(this.recetasPath, require("../routes/receta.routes"));
    this.app.use(this.reservaPath, require("../routes/reserva.routes"));
    this.app.use(this.usuariosPath, require("../routes/usuario.routes"));
    this.app.use(
      this.ingredientesPath,
      require("../routes/ingrediente.routes")
    );
    this.app.use(this.proveedoresPath, require("../routes/proveedor.routes"));
    this.app.use(this.pedido_ingPath, require("../routes/pedido_ing.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
