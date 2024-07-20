import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddUser(url) {
    
    const navigate = useNavigate();

    const handleRegister = async (event, username, email, password, phoneNumber, address) => {
        event.preventDefault();
        try {
            const dataAdded = { username, email, password, phoneNumber, address, role: "user" };

            let { data } = await axios.post(`${url}/register`, dataAdded);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row grid grid-cols-2 gap-4">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <br />
                        <h3 className="text-2xl font-bold">Create an account</h3>
                        <p className="py-6">
                            Fill in the form to create a new account.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="username"
                                    placeholder="username"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input
                                    type="phoneNumber"
                                    placeholder="phone number"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="address"
                                    placeholder="address"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select className="select select-bordered" required>
                                    <option value="">Select a role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div> */}
                            <div className="form-control mt-6">
                                <button onClick={handleRegister} className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div>Already have an account? Please <Link to="/login">login</Link></div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddUser