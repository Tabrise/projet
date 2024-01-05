const express = require('express')
const route = express.Router()
const modelController = require('../controller/modele')

route.post('/create',modelController.CreateModele)

module.exports = route
