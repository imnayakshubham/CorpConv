import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '../../../store/action/login';
import "./Navbar.css"
import { LoginWithGoogle } from "../LoginWithGoogle/LoginWithGoogle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { cn } from "@/utils/utils";
import React from "react";

// const apiPayload = {
//     "actual_user_name": "Shubham Nayak",
//     "is_email_verified": true,
//     "email_id": "shane.henry@example.com",
//     "is_anonymous": true,
//     "user_phone_number": null,
//     "actual_profile_pic": "https://lh3.googleusercontent.com/a/ACg8ocLo_puA6u6DrxZ-9ryLs59wzTPt1uTxPIIiFhxpZUEm=s96-c",
//     "providerId": "firebase",
//     "meta_data": {
//         "createdAt": "1703058890617",
//         "lastLoginAt": "1703059959133"
//     },
//     "provider": "google.com"
// }

export const Navbar = () => {
    const dispatch = useDispatch()
    const { loginResponse: userInfo } = useSelector(state => state.login)

    const components = [
        {
            title: <div className="nav-logo">Profile</div>,
            to: `/user/${userInfo?._id}`,
        },
        {
            title: "Update Profile",
            to: "/update-profile",
        },
        {
            title: "Surveys",
            disable: true,
            description: "Beta"
        },
        {
            title: "Answer Link",
            disable: false,
            to: "/answerlink"
        },
        {
            title: "Logout",
            onClick: () => {
                dispatch(logoutRequest())
            }
        },
    ]

    return (
        <header className="header" id="navigation-menu">
            <nav className="navbar">
                <div className="navbar__left">
                    <Link to="/" className="nav__logo__text">CorpConv</Link>
                </div>
                <div className="navbar__right">
                    {userInfo?.token ? <>
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-2 items-center align-middle">
                                <NavigationMenuItem className="hidden sm:block">
                                    <Link to={"/chats"}>
                                        <NavigationMenuLink>
                                            Chat
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem className="hidden sm:block">
                                    <Link to={"/posts"}>
                                        <NavigationMenuLink>
                                            Posts
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem className="hidden sm:block">
                                    <Link to={"/users"}>
                                        <NavigationMenuLink>
                                            Community
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        <div onClick={e => e.preventDefault()} className="cursor-pointer">
                                            <Avatar>
                                                <AvatarImage src={userInfo?.user_public_profile_pic} />
                                                <AvatarFallback>{userInfo?.public_user_name}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="mt-1 w-[200px] flex-start flex-col fixed right-3 z-50 top-16 shadow-sm bg-[#fff]	border rounded-sm">
                                            {components.map((component) => (
                                                <ListItem
                                                    key={component.title}
                                                    title={component.title}
                                                    to={component.to}
                                                    {...component}
                                                >
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </>
                        :
                        <LoginWithGoogle />
                    }
                </div>
            </nav>
        </header>
    )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});

ListItem.displayName = "ListItem"
