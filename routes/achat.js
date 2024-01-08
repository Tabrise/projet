const express = require('express')
const route = express.Router()
const achatController = require('../controller/achat')

route.get('/mois', achatController.totalMensuel)
route.get('/all', achatController.allAchat)

module.exports = route