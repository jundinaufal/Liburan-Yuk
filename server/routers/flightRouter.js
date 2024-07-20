const express = require('express')
const router = express.Router()
const FlightController = require('../controllers/flightController')
// const authentication = require('../middlewares/authentication')

router.get('/airport', FlightController.getAirportDetails)
router.post('/', FlightController.createFlight)
router.get('/', FlightController.getFlights)
router.get('/:id', FlightController.getFlightById)
router.put('/:id', FlightController.updateFlight)
router.delete('/:id', FlightController.deleteFlight)

module.exports = router