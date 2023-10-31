const express = require("express");
const { router } = require("./routes/componente_routes.js");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(1907, function () {
  console.log("port 1907");
});

module.exports = { app };