import { createBrowserRouter, redirect } from "react-router-dom";
import Home from '../views/Home'
import AddFlight from '../views/AddFlights'
import AddUser from '../views/AddUser'
import EditFlight from '../views/EditFlights'
// import EditImage from '../Views/EditImage'
import BaseLayout from '../views/BaseLayout'
// import DetailProduct from '../Views/DetailProduct'
import Login from '../views/Login'
import Flight from '../views/Flight'
// import { ToastContainer, toast } from 'react-toastify';

const url = 'http://localhost:3000'

const router = createBrowserRouter([
    {
        path: "/register",
        element: <AddUser url={url} />
    },
    {
        path: "/login",
        element: <Login url={url} />,
        loader: () => {
            if (localStorage.access_token) {
                // toast.success('Login berhasil!', {
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
                return redirect('/')
            }
            return null
        }
    },
    {
        element: <BaseLayout url={url} />,
        loader: () => {
            if (!localStorage.access_token) {
                // toast.error('Login dulu ya buat akses fitur lainnya', {
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
                return redirect('/login')
            }
            return null
        },
        children: [
            {
                path: '/',
                element: <Home url={url} />
            },
            // {
            //     path: "/itinerary",
            //     // element: <DetailProduct url={url} />
            // },
            {
                path: '/flights/add',
                element: <AddFlight url={url} />
            },
            {
                path: "/edit/:id",
                element: <EditFlight url={url} />
            },
            {
                path: "/flights",
                element: <Flight url={url} />
            },
            // {
            //     path: "/editImage/:id",
            //     element: <EditImage url={url} />
            // },
        ]
    }
])

export default router