
import { PostSkeleton } from './PostSkeleton'

export const PostsListSkeleton = ({ count = 5 }) => {
    const posts = Array.from({ length: count }, (_, i) => i)
    return (
        posts.map((post) => (<PostSkeleton key={post} />))
    )
}
