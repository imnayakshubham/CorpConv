
import { PostSkeleton } from './PostSkeleton'

export const PostsListSkeleton = ({ count = 5 }) => {
    const posts = Array.from({ length: count }, (_, i) => i)
    return (
        // <div className='flex gap-2 flex-col w-full'>
        posts.map((post) => (<PostSkeleton key={post} />))
        // </div>
    )
}
