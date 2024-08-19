import { Link } from "react-router-dom"
import PageWrapper from "../PageWrapper/PageWrapper"

const PageNotFound = () => {
    return (
        <PageWrapper>
            <div className="flex items-center h-[88vh] justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-lg">Oops! Page not found.</p>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Go back to home
                    </Link>
                </div>
            </div>
        </PageWrapper>
    )
}

export default PageNotFound
