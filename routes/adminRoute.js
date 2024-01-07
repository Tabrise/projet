// adminRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/middleware');

// Route pour la page d'administration
router.get('/admin', middleware.authenticator, (req, res) => {
    res.sendFile('C:/nodejs-cours/projet/projet/Vue/admin.html'); // Assurez-vous que le chemin est correct
});

module.exports = router;
