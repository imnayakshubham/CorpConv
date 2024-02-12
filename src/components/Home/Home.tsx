import { Outlet } from "react-router-dom"

import { Navbar } from "../Navbar/Navbar"

export const Home = () => {

    return (
        <div>
            <Navbar />
            <div className="app__container">
                <Outlet />
            </div>
        </div>
    )
}
