const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const middleware = require('../middleware/middleware')



router.get('/getUser', userController.getAllUser)
router.post('/create', userController.createUser)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/', middleware.authenticator, (req, res) => {
    res.sendFile(__dirname + "/vue/admin.html");
});


module.exports = router;