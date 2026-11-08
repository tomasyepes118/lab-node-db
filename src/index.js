const express = require("express");
const path = require("path");
const personaRoutes = require("./routes/personaRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/", personaRoutes);

module.exports = app;
