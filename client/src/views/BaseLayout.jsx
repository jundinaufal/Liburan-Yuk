import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navbar";

function BaseLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default BaseLayout