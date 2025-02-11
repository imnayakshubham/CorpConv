import BlurFade from "../BlurFadeContainer/blur-fade";

export const MainLoader = () => {
    return (
        <BlurFade delay={0.2}>
            <div className="bg-transparent h-screen flex flex-col items-center justify-center space-y-4 text-center">
                <div className="pulsing-circle w-[50px] h-[50px] bg-[#000] rounded-full animate-pulse"></div>
                <div className="text-lg font-semibold text-gray-700 py-2">
                    Loading...
                </div>
            </div>
        </BlurFade>
    );
}
