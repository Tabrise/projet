const express = require('express')
const route = express.Router()
const databaseController = require('../controller/database')

route.get('/create', databaseController.createAllTable)

module.exports = route