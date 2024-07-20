import { useEffect, useState } from "react"
// import Toastify from 'toastify-js'
import axios from 'axios'
import { Link } from "react-router-dom"

function FlightForm({ url, handleSubmit, flight, nameProp }) {
    const [departureCity, setDeparture] = useState("")
    const [arrivalCity, setDestination] = useState("")
    const [departureDate, setDepartureDate] = useState(0)
    const [returnDate, setReturnDate] = useState(0)
    // const [stock, setStock] = useState(0)
    // const [categoryId, setCategoryId] = useState("")
    const [flights, setFlights] = useState([])

    // console.log(categories, `categories di form`);
    useEffect(() => {
        if (flight) {
            setDeparture(flight.departureCity)
            setDestination(flight.arrivalCity)
            setDepartureDate(flight.departureDate)
            setReturnDate(flight.returnDate)
            // setStock(product.stock)
            // setCategoryId(product.categoryId)
        }
    }, [flight])

    async function fetchFlight() {
        try {
            const { data } = await axios.get(`${url}/flights`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            // console.log(data.categories, `data di form`);
            setFlights(data.flights)
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

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col mt-10">
                    <div className="text-center lg:text-left">
                        <h3 className="text-2xl font-bold">{nameProp}</h3>
                        <p className="py-6">
                            Fill in the form to {nameProp}.
                        </p>
                    </div>
                    <div className="card bg-base-100 shadow-2xl">
                        <form onSubmit={(e) => handleSubmit(e, departureCity, arrivalCity, departureDate, returnDate)} className="card-body grid grid-cols-2 ">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Flight Origin</span>
                                </label>
                                <input
                                    onChange={(e) => setDeparture(e.target.value)}
                                    type="text"
                                    placeholder="Flight Origin"
                                    className="input input-bordered"
                                    value={departureCity}
                                // required
                                />
                            </div>
                            <div className="form-control">
                            <label className="label">
                                    <span className="label-text">Flight Destination</span>
                                </label>
                                <input
                                    onChange={(e) => setDestination(e.target.value)}
                                    type="text"
                                    placeholder="Flight Destination"
                                    className="input input-bordered"
                                    value={arrivalCity}
                                // required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Departure Date</span>
                                </label>
                                <input
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    type="date"
                                    placeholder="Departure Date"
                                    className="input input-bordered"
                                    value={departureDate}
                                // required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Return Date</span>
                                </label>
                                <input
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    type="date"
                                    placeholder="Return Date"
                                    className="input input-bordered"
                                    value={returnDate}
                                />
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Stock</span>
                                </label>
                                <input
                                    onChange={(e) => setStock(e.target.value)}
                                    type="number"
                                    placeholder="Stock"
                                    className="input input-bordered"
                                    value={stock}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    name="category"
                                    id="category-select"
                                    value={categoryId}
                                >
                                    <option value="" disabled hidden>
                                        Select a category
                                    </option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                            <div className="form-control mt-6 grid grid-cols-2">
                                <button type="submit" className="btn btn-primary">{nameProp}</button>
                                <Link to="/">
                                <button className="btn btn-neutral hover:btn-accent-focus transition duration-300 ease-in-out">
                                    Cancel
                                </button>
                            </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default FlightForm