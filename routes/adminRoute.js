// adminRoutes.js
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const achatController = require('../controller/achat')


// Route pour la page d'administration
router.get('/', middleware.authenticator,achatController.allAchat);

module.exports = router;
