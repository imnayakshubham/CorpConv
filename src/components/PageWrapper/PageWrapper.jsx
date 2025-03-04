import { cn } from "@/utils/utils"
import BlurFade from "../BlurFadeContainer/blur-fade"

const defaultBodyStyle = "w-full"


const PageWrapper = ({ children, bodyClass = defaultBodyStyle }) => {
    return (
        <>
            <BlurFade delay={0.2}>
                <section className="flex justify-center md:px-2 py-20 min-h-screen">
                    <div className={cn("w-full px-3 md:px-6", bodyClass)}>
                        {children}
                    </div>
                </section>
            </BlurFade>
        </>
    )
}

export default PageWrapper
