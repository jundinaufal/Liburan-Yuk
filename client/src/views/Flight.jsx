import axios from 'axios';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import gearLoad from "../Components/assets/react.svg"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

function showFlights({ url }) {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmitItinerary(id) {
        console.log(id, `id sebagai params`);
        if (!id) {
            toast.error("Invalid ID", {
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            });
            return;
        }

        try {
            console.log("Masuk ga")
            console.log(`${url}/itinerary?id=${id}`)
            // const response = await axios.post(`${url}/itinerary?id=${id}`, {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.access_token}`
            //     }
            // });
            // const response = await axios.post(`${url}/itinerary`, {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.access_token}`
            //     },
            //     params: {
            //         id: id
            //     }
            // })
            const response = await axios({
                method: 'POST',
                url: `${url}/itinerary`,
                params: {
                    id
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            if (response.status !== 201) {
                throw new Error(`Failed to create itinerary: ${response.statusText}`);
            }

            toast.success("Success add new data", {
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            });
            navigate('/');
        } catch (error) {
            console.error(error);
            console.error('Axios Error:', error);
            console.error('Error Message:', error.message);
            console.error('Error Response:', error.response);
            console.error('Error Request:', error.request)
            // toast.error(`Error: ${error.message}`, {
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
            // });
        }
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/flights/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            toast.success("Success delete", {
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            });
            fetchFlight();
        } catch (error) {
            toast.error(error.response.data.error, {
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            });
        }
    }

    async function fetchFlight() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}/flights`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            setFlights(data.flights);
        } catch (error) {
            toast.error(error.response.data.error, {
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log('ini proses mounted, akan dijalankan sebelum pemasangan dom & react di komponen ini (saat memasuki komponen ini)');
        fetchFlight();
    }, []);

    return (
        <>
            <ToastContainer />
            <Link to="/flights/add" className="flex justify-between mb-4 mt-10">
                <button className="btn">Tambah Flight</button>
            </Link>

            {loading ? (
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} />
                </div>
            ) : (
                <div className="overflow-x-auto mt-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Flight Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight) => (
                                <tr key={flight.id}>
                                    <th>{flight.id}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font">{[`From ${flight.departureCity}`, ` To ${flight.arrivalCity}`, ` with Flight time ${flight.flightTime}`]}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <th>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleSubmitItinerary(flight.id)} className="btn btn-ghost btn-xs text-green-500">
                                                <i className="fas fa-heart"></i>
                                            </button>
                                            <Link to={`/edit/${flight.id}`} className="btn btn-ghost btn-xs text-yellow-500">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button onClick={() => handleDelete(flight.id)} className="btn btn-ghost btn-xs text-red-500">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default showFlights;