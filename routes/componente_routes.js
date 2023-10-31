const express = require("express");
const {componente} = require("../controller/componentes_controller.js");


let router = express.Router();
router.get("/componentes", componente.read);
module.exports = {router};