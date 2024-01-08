const express = require('express')
const route = express.Router()
const options = require('../controller/option')

route.get('/mois',)
route.get('/options', options.AllOptions)
module.exports = route