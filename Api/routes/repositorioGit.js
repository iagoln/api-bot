var express = require('express');
var router = express.Router();
const repositorioController = require('../controller/repositorioController')

router.get("/repositoriocsharp", repositorioController.getRepositorio);

module.exports = router;
