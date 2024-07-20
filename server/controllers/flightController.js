const axios = require('axios');
const { Flight } = require('../models');
const { where } = require('sequelize');

class Controller {
    static async createFlight(req, res, next) {

        const earthRadiusKm = 6371;

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) *
                Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return earthRadiusKm * c;
        }

        function formatTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
        }

        try {
            let { departureCity, arrivalCity, departureDate, returnDate } = req.body;

            const departure = await axios.get(`${process.env.RAPIDAPI_HOST}/airport/?iata=${departureCity}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                },
            });

            const arrival = await axios.get(`${process.env.RAPIDAPI_HOST}/airport/?iata=${arrivalCity}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                },
            });

            const speedKnots = 400;

            departureCity = departure.data.location
            arrivalCity = arrival.data.location
            const departureLat = departure.data.latitude
            const departureLon = departure.data.longitude
            const arrivalLat = arrival.data.latitude
            const arrivalLon = arrival.data.longitude

            const distance = calculateDistance(departureLat, departureLon, arrivalLat, arrivalLon);
            const flightTime = distance / 1.852 / speedKnots;
            const flightTimeInMinutes = Math.round(flightTime * 60);

            if (!departureCity || !arrivalCity) {
                throw { name: "Wrong Airport Code" };
            }

            const flight = await Flight.create({
                departureCity,
                arrivalCity,
                departureDate,
                returnDate,
                flightTime: formatTime(flightTimeInMinutes),
            });

            res.status(201).json({
                message: "Success create new flight",
                flight,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getFlights(req, res, next) {
        try {
            const flights = await Flight.findAll();
            // console.log(flights, `data flight di flightController`);
            res.status(200).json({
                flights,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getFlightById(req, res, next) {
        try {
            const id = req.params.id;
            const flight = await Flight.findByPk(id);

            if (!flight) throw { name: "FlightNotFound" };

            res.status(200).json({
                flight,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async updateFlight(req, res, next) {

        const earthRadiusKm = 6371;

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) *
                Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return earthRadiusKm * c;
        }

        function formatTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
        }

        try {
            const id = req.params.id;
            let flight = await Flight.findByPk(id);

            if (!flight) throw { name: "FlightNotFound" };

            let { departureCity, arrivalCity, departureDate, returnDate } = req.body;

            // Fetch airport details using RAPIDAPI
            const departure = await axios.get(`${process.env.RAPIDAPI_HOST}/airport/?iata=${departureCity}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                },
            });

            const arrival = await axios.get(`${process.env.RAPIDAPI_HOST}/airport/?iata=${arrivalCity}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                },
            });

            const speedKnots = 400;

            departureCity = departure.data.location
            arrivalCity = arrival.data.location
            const departureLat = departure.data.latitude
            const departureLon = departure.data.longitude
            const arrivalLat = arrival.data.latitude
            const arrivalLon = arrival.data.longitude

            const distance = calculateDistance(departureLat, departureLon, arrivalLat, arrivalLon);
            const flightTime = distance / 1.852 / speedKnots;
            const flightTimeInMinutes = Math.round(flightTime * 60);

            if (!departureCity || !arrivalCity) {
                throw { name: "AirportNotFound" };
            }

            await flight.update({
                departureCity, arrivalCity, departureDate, returnDate, flightTime: formatTime(flightTimeInMinutes),
            }, {
                where: {
                    id
                }
            })

            flight = await Flight.findByPk(id);

            res.status(200).json({
                message: "Success update flight",
                flight,
            });
        } catch (err) {
            console.log(err, `error saat update`);
            next(err);
        }
    }

    static async deleteFlight(req, res, next) {
        try {
            const id = req.params.id;
            const flight = await Flight.findByPk(id);

            if (!flight) throw { name: "FlightNotFound" };

            await flight.destroy();

            res.status(200).json({
                message: "Success delete flight",
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getAirportDetails(req, res, next) {

        const { iata, icao } = req.query

        try {
            const response = await axios.get(`${process.env.RAPIDAPI_HOST}/airport/?iata=${iata}`, {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                },
            });

            const data = response.data

            res.status(200).json({
                data
            })
            // return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

module.exports = Controller;