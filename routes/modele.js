const express = require('express')
const route = express.Router()
const modelController = require('../controller/modele')

route.post('/create',modelController.CreateModele)
route.get('/',modelController.allModele)
route.get('/modele/:idModele',modelController.findModele)

module.exports = route
