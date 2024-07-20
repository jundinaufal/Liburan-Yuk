const { GoogleGenerativeAI } = require('@google/generative-ai')
const { Itinerary, User, Flight } = require('../models');

class Controller {

    static async createItinerary(req, res, next) {
        console.log("mashook")
        try {
            const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
            const { id } = req.query;
            const destination = await Flight.findByPk(id)
            const FlightId = destination.id;
            const UserId = req.login_info.user_id;

            const prompt = `Give vacation place in ${destination.arrivalCity} in string without bolding any text or title in bahasa`;

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim();

            // console.log(typeof(text), `data dari gemini`);
            // console.log(text, `data dari gemini`);
            // const jsonArray = text.split(', ').map((place) => ({ name: place }));

            const itinerary = await Itinerary.create({ UserId, FlightId, recommendation: text });

            res.status(201).json({
                message: "Success create new itinerary",
                itinerary
            });
        } catch (error) {
            console.log(error, `ini errrornya`);
            next(error);
        }
    }

    static async getItineraries(req, res, next) {
        try {

            const itineraries = await Itinerary.findAll({
                include: {
                    model: Flight
                }
            })

            // console.log(itineraries, `itinerary di controller`);
            res.status(200).json({
                itineraries
            })

        } catch (error) {
            console.log(error, `error di itinerary`);
            next(error)
        }
    }

    static async getItineraryById(req, res, next) {
        try {
            const id = req.params.id
            const itinerary = await Itinerary.findByPk(id)

            if (!itinerary) throw { name: "ItineraryNotFound" }

            res.status(200).json({
                itinerary
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateItinerary(req, res, next) {
        try {
            const id = req.params.id
            const { userId, flightId } = req.body
            const itinerary = await Itinerary.findByPk(id)

            if (!itinerary) throw { name: "ItineraryNotFound" }

            itinerary.userId = userId
            itinerary.flightId = flightId

            await itinerary.save()

            res.status(200).json({
                message: "Success update itinerary",
                itinerary
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteItinerary(req, res, next) {
        try {
            const id = req.params.id
            const itinerary = await Itinerary.findByPk(id)

            if (!itinerary) throw { name: "ItineraryNotFound" }

            await itinerary.destroy()

            res.status(200).json({
                message: "Success delete itinerary"
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller