import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const Home = () => {
    const { loginResponse } = useSelector(state => state.login)
    const navigateTo = useNavigate()

    useEffect(() => {
        if (!loginResponse) {
            navigateTo("/")
        } else if ((!loginResponse.user_current_company_name || !loginResponse.user_job_experience || !loginResponse.user_job_role)) {
            navigateTo("/update-profile")
        }
    }, [loginResponse, navigateTo])

    return (
        <div>
            <Navbar />
            <div className="app__container">
                <Outlet />
            </div>
        </div>
    )
}
