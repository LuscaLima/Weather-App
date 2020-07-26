const { join } = require("path");
const express = require("express");
require("dotenv/config");

/** REQUISICAO DA LOCALIZACAO DO USUÁRIO */

const publicPath = join(__dirname, "..", "public");
const viewsPath = join(__dirname, "views");

/** Instantiate the express and define the port to listen */
const app = express();
const port = process.env.PORT || 3000;

/** All basic settings for express */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

/** Setup the views path and template engine  */
app.set("views", viewsPath);
app.set("view engine", "pug");

const appRouter = require("./routes");

/** Setup all routes associate with the main route */
app.use("/", appRouter);

app.listen(port, () => {
  console.log("Server up on port " + port);
});
