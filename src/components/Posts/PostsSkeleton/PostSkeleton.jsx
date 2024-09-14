export const PostSkeleton = () => {
    return (
        <div className="mx-auto p-4 my-8 bg-white shadow-md rounded-md flex gap-2 flex-col">
            <div className="flex items-center gap-1">
                <div className="w-12 h-12 bg-gray-300  animate-shimmer rounded-full"></div>
                <div>
                    <div className="w-48 h-4 bg-gray-300  animate-shimmer mb-2"></div>
                    <div className="w-32 h-3 bg-gray-300  animate-shimmer"></div>
                </div>
            </div>

            <div className="ml-12">
                <div className="w-full h-4 bg-gray-300  animate-shimmer"></div>
                <div className="w-full h-4 bg-gray-300  animate-shimmer"></div>
                <div className="w-full h-4 bg-gray-300  animate-shimmer"></div>
                <div className="w-full h-4 bg-gray-300  animate-shimmer"></div>
                <div className="w-full h-4 bg-gray-300  animate-shimmer"></div>
                <div className="w-full h-4 bg-gray-300  animate-shimmer"></div>
            </div>

            <div className="flex items-center space-x-4 ml-12">
                <div className="w-8 h-6 bg-gray-300  animate-shimmer"></div>
                <div className="w-8 h-6 bg-gray-300  animate-shimmer"></div>
            </div>
        </div>
    )
}
