const express = require('express')
const route = express.Router()
const achatController = require('../controller/achat')

route.get('/mois', achatController.totalMensuel)
module.exports = route