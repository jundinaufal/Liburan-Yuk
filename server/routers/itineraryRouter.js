const express = require('express')
const router = express.Router()
const ItineraryController = require('../controllers/itineraryController')
const authentication = require('../middlewares/authentication')

router.post('/', ItineraryController.createItinerary)
router.get('/', ItineraryController.getItineraries)
router.get('/:id', ItineraryController.getItineraryById)
// console.log('kelewatan')
router.put('/:id', ItineraryController.updateItinerary)
router.delete('/:id', ItineraryController.deleteItinerary)

module.exports = router