import { BadgeCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import "./UserAvatar.css"

export const UserAvatar = ({
    isUserVerified = false, title = null, description = null, titleClassName = "avatar__header", descriptionClassName = "avatar__header__info", avatarImage = "https://github.com/shadcn.png" }) => {
    return (
        <div className="avatar__header" >
            <div className="avatar__img__container">
                <Avatar>
                    <AvatarImage src={avatarImage} alt={title ?? "img"} loading="lazy" />
                    <AvatarFallback>{title}</AvatarFallback>
                </Avatar>
                {isUserVerified &&
                    <BadgeCheck className="verified_user" />
                }
            </div>
            <div>
                {title && <h3 className={titleClassName}>{title}</h3>}
                {description && <div className={descriptionClassName}>
                    <span className="gray__color_sub_title">{description}</span>
                </div>
                }
            </div>
        </div >
    )
}
