const Persona = require("../models/persona");

async function listarPersonas(req, res) {
  const personas = await Persona.find().sort({ apellido: 1, nombre: 1 }).lean();

  res.render("personas/index", {
    titulo: "Listado de personas",
    personas,
  });
}

module.exports = { listarPersonas };
