const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const ItineraryController = require('../controllers/itineraryController')
const authentication = require('../middlewares/authentication')
const adminAuthorization = require('../middlewares/adminAuthorization')
const flightRouter = require('./flightRouter')
const itineraryRouter = require('./itineraryRouter')
const userRouter = require('./userRouter')

router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)
router.post('/register', UserController.register)

router.use(authentication)

router.use('/users', userRouter)
router.use('/flights', flightRouter)
router.use('/itinerary', itineraryRouter)

module.exports = router