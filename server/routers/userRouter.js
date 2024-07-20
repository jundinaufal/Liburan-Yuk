const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const adminAuthorization = require('../middlewares/adminAuthorization')

router.use(adminAuthorization)

router.get('/', UserController.showAllUsers)
router.get('/:id', UserController.showUserById)
router.put('/:id', UserController.editUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router