const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const middleware = require('../middleware/middleware')



router.get('/getUser', middleware.authenticator, userController.getAllUser)
router.post('/create', userController.createUser)
router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router;