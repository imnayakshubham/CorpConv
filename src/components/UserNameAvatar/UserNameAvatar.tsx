import { Avatar } from 'antd'

export const UserNameAvatar = ({ name = "X", showName = true, size = 40 }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexWrap: "wrap" }}>
            <Avatar size={size}>
                {name?.[0] ?? "A"}
            </Avatar>
            {showName &&
                <h4>
                    {name}
                </h4>
            }
        </div>

    )
}
