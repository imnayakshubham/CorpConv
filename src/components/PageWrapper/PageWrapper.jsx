import { cn } from "@/utils/utils"
import { Navbar } from "../Navbar/Navbar"

const defaultBodyStyle = "w-full"


const PageWrapper = ({ children, bodyClass = defaultBodyStyle }) => {
    return (
        <>
            <Navbar />
            <section className="flex justify-center items-center pt-4 pb-20 md:py-4 md:px-2 md:pb-6">
                <div className={cn("w-full px-3 md:px-6", bodyClass)}>
                    {children}
                </div>
            </section>
        </>
    )
}

export default PageWrapper
