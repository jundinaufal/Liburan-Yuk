import ProductForm from "../Components/FlightForm";
import axios from 'axios'
// import Toastify from 'toastify-js'
import { useNavigate } from 'react-router-dom'
import FlightsForm from "../Components/FlightForm";

export default function ProductsForm({ url }) {
    const navigate = useNavigate()
    async function handleSubmit(e, departureCity, arrivalCity, departureDate, returnDate) {
        e.preventDefault()
        try {
            const dataAdded = { departureCity, arrivalCity, departureDate, returnDate }

            const { data } = await axios.post(`${url}/flights`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            // Toastify({
            //     text: "Success add new data",
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
            console.log(error);
            // Toastify({
            //     text: error.response,
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
            <FlightsForm url={url} handleSubmit={handleSubmit} nameProp="Add Flight" />
        </>
    )
}