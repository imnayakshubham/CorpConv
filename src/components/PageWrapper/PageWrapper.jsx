import { cn } from "@/utils/utils"
import BlurFade from "../BlurFadeContainer/blur-fade"

const defaultBodyStyle = "w-full"


const PageWrapper = ({ children, bodyClass = defaultBodyStyle }) => {
    return (
        <>
            <BlurFade delay={0.2}>
                <section className="flex justify-center items-center pt-4 md:py-4 md:px-2 md:pb-6">
                    <div className={cn("w-full px-3 md:px-6", bodyClass)}>
                        {children}
                    </div>
                </section>
            </BlurFade>
        </>
    )
}

export default PageWrapper
