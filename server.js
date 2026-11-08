require("dotenv").config({ quiet: true });

const app = require("./src/index");
const conectarBaseDeDatos = require("./src/configurations/database");

const PORT = process.env.PORT || 3000;

async function iniciar() {
  await conectarBaseDeDatos();

  app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
  });
}

iniciar().catch((error) => {
  console.error("No se pudo iniciar el servidor.");
  console.error(error.message);
  process.exit(1);
});
