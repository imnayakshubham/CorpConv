import "./SkeletonUserCardLoading.css"

export const SkeletonUserCardLoading = () => {
    return (
        <div className="skeleton-loading">
            <div className="user-card-loading">
                <div className='user__card__header__loading'>
                    <div className="avatar-loading"></div>
                    <div className="avatar-loading"></div>
                </div>
                <div className="meta-loading">
                    <div className="ribbon-loading"></div>
                    <div className="title-loading"></div>
                    <div className="description-loading"></div>
                </div>
            </div>
        </div>
    )
}
