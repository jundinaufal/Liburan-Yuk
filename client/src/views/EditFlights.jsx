import FlightForm from "../Components/FlightForm";
import axios from 'axios'
// import Toastify from 'toastify-js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

function FlightsForm({ url }) {
    const [flight, setFlight] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()

    async function fetchFlight() {
        try {
            const { data } = await axios.get(`${url}/flights/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setFlight(data.flights)
        } catch (error) {
            // Toastify({
            //     text: error.response.data.error,
            //     duration: 2000,
            //     newWindow: true,
            //     close: true,
            //     gravity: "top",
            //     position: "left",
            //     stopOnFocus: true,
            //     style: {
            //         background: "#EF4C54",
            //         color: "#17202A",
            //         boxShadow: "0 5px 10px black",
            //         fontWeight: "bold"
            //     }
            // }).showToast();
        }
    }

    useEffect(() => {
        fetchFlight()
    }, [])

    async function handleSubmit(e, departureCity, arrivalCity, departureDate, returnDate) {
        e.preventDefault()
        try {
            const dataAdded = { departureCity, arrivalCity, departureDate, returnDate }

            await axios.put(`${url}/flights/${id}`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            // Toastify({
            //     text: "Success edit Flight",
            //     duration: 2000,
            //     newWindow: true,
            //     close: true,
            //     gravity: "top",
            //     position: "left",
            //     stopOnFocus: true,
            //     style: {
            //         background: "#00B29F",
            //         color: "#17202A",
            //         boxShadow: "0 5px 10px black",
            //         fontWeight: "bold"
            //     }
            // }).showToast();

            navigate('/flights')
        } catch (error) {
            // Toastify({
            //     text: error.response.data.error,
            //     duration: 2000,
            //     newWindow: true,
            //     close: true,
            //     gravity: "top",
            //     position: "left",
            //     stopOnFocus: true,
            //     style: {
            //         background: "#EF4C54",
            //         color: "#17202A",
            //         boxShadow: "0 5px 10px black",
            //         fontWeight: "bold"
            //     }
            // }).showToast();
        }
    }

    return (
        <>
            <FlightForm url={url} handleSubmit={handleSubmit} flight={flight} nameProp="Edit Flight" />
        </>
    )
}

export default FlightsForm