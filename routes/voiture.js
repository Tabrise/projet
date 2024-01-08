const express = require('express')
const router = express.Router()
const voitureController = require('../controller/voiture')
const middleware = require('../middleware/middleware')

router.get('/getVoiture/:idModele', middleware.authenticator,voitureController.getVoiture)


module.exports = router