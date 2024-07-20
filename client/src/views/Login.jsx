import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

function Login({ url }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault();
        try {
            let { data } = await axios.post(`${url}/login`, { email, password });
            console.log(data, `dari post`);
            localStorage.setItem("access_token", data.access_token);
            navigate('/')
            toast.success('Login berhasil!', {
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
        } catch (error) {
            console.log(error);
            toast.error('Login dulu ya buat akses fitur lainnya', {
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
        }
    }

    async function googleLogin(codeResponse) {
        try {
            console.log(codeResponse);
            const { data } = await axios.post(
                `${url}/google-login`, null, {
                headers: {
                    token: codeResponse.credential
                }
            });
            localStorage.setItem("access_token", data.access_token)
            navigate('/')
        } catch (error) {
            console.log(error);
            await Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        }
    }


    return (
        <>
            <div className="hero min-h-screen">
                <video autoPlay loop muted className="object-cover w-full h-full" style={{ opacity: 0.4 }}>
                    <source src="your-video.mp4" type="video/mp4" />
                </video>
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Hai sobat, Liburan Yuk!</h1>
                        <br />
                        <h3 className='text-2xl font-bold'>Login dulu ya buat akses fitur lainnya!</h3>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPassword(e.target.value)} required />
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleLogin} className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div>Don't have an account? Please <Link to="/register">register</Link></div>
                        <div className="divider px-10">OR</div>
                        <div className="mt-6 flex justify-center items-center">
                            <GoogleLogin onSuccess={googleLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login