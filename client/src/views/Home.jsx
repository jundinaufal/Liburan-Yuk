import axios from 'axios';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import gearLoad from "../Components/assets/react.svg"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Home({ url }) {
    const [itineraries, setItinerary] = useState([]);
    const [flights, setFlight] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    console.log(itineraries, `flight di awal home`);
    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/itinerary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            toast.success('Delete berhasil!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
            });

            fetchItineraries()
        } catch (error) { //error.response.data.error
            console.log(error, `error delete`);
            // toast.error(error.response.data.error, {
            //     position: "bottom-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //     // transition: Zoom,
            // });
        }
    }

    async function fetchItineraries() {
        try {
            setLoading(true)
            const { data: itineraryData } = await axios.get(`${url}/itinerary`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
            });

            const { data: flightsData } = await axios.get(`${url}/flights`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            // console.log(flightsData, `data flight di home`);
            setItinerary(itineraryData.itineraries);
            setFlight(flightsData.flights);
        } catch (error) {
            toast.error(error.response.data.error, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Zoom,
            });
        } finally {
            setLoading(false)
        }
    }

    // lifecyle mounted
    useEffect(() => {
        console.log('ini proses mounted, akan dijalankan sebelum pemasangan dom & react di komponen ini (saat memasuki komponen ini)');
        fetchItineraries();
    }, []) // mounted

    useEffect(() => {
        console.log('ini adalah watchers, akan dijalankan sebelum pemasangan dom & react di komponen ini dan ketika state yg di pantau dalam dependencies(parameter kedua) berubah');
        fetchItineraries();
    }, [search])

    return (
        <>
            {/* <Link to="/add" className="flex justify-between mb-4 mt-10">
                <button className="btn">Tambah Itinerary</button>
            </Link> */}

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
                                <th>Rencana Penerbangan</th>
                                <th>Saran Perjalanan</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itineraries.map((itinerary) => (
                                <tr key={itinerary.id}>
                                    <td>{itinerary.id}</td>
                                    <td>
                                        {`Dari ${itinerary.Flight.departureCity} ke ${itinerary.Flight.arrivalCity}`}
                                    </td>
                                    <td>
                                        {itinerary.recommendation}
                                    </td>
                                    <td> {/* changed from th to td */}
                                        <div className="flex gap-2">
                                            {/* <Link to={`/itinerary/${itinerary.id}`} className="btn btn-ghost btn-xs text-green-500">
                                                <i className="fas fa-book-open-reader"></i>
                                            </Link>
                                            <Link to={`/edit/${itinerary.id}`} className="btn btn-ghost btn-xs text-yellow-500">
                                                <i className="fas fa-edit"></i>
                                            </Link> */}
                                            <button onClick={() => handleDelete(itinerary.id)} className="btn btn-ghost btn-xs text-red-500">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Home