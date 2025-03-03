import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '../../../store/action/login';
import "./Navbar.css"
import { LoginWithGoogle } from "../LoginWithGoogle/LoginWithGoogle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { cn } from "@/utils/utils";
import React, { useEffect, useState } from "react";

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
            title: "Logout",
            onClick: () => {
                dispatch(logoutRequest())
            }
        },
    ]

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? " backdrop-blur-sm border-b shadow-sm" : "bg-transparent"}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 nav__logo__text">
                                Hushwork
                            </span>
                        </Link>
                    </div>

                    <nav className="navbar__right hidden sm:block">
                        {userInfo?.token ? <>
                            <NavigationMenu>
                                <NavigationMenuList className="flex gap-2 items-center align-middle">
                                    <NavigationMenuItem>
                                        <Link to={"/chats"}>
                                            <NavigationMenuLink>
                                                Chat
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link to={"/posts"}>
                                            <NavigationMenuLink>
                                                Posts
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link to={"/users"}>
                                            <NavigationMenuLink>
                                                Community
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link
                                            to={"/answerlink"}
                                        >
                                            {"Answer Link"}
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <Link
                                            to={"/surveys"}
                                        >
                                            {"Surveys"}
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-transparent p-0">
                                            <div onClick={e => e.preventDefault()} className="cursor-pointer">
                                                <Avatar>
                                                    <AvatarImage src={userInfo?.user_public_profile_pic} alt="User Profile Pic" loading='lazy' />
                                                    <AvatarFallback>{userInfo?.public_user_name}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="mt-1 w-[200px] flex-start flex-col fixed right-3 z-50 top-16 shadow-sm bg-[#fff] border rounded-sm">
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
                    </nav>
                </div>
            </div>
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
                    <span className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </span>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});

ListItem.displayName = "ListItem"