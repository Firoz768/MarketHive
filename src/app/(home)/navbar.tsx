"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const navbarItems = [
    {
        href: "/",
        children: "Home"
    },
    {
        href: "/about",
        children: "About"
    },
    {
        href: "/features",
        children: "Features"
    },
    {
        href: "/pricing",
        children: "Pricing"
    },
    {
        href: "/contact",
        children: "Contact"
    },
];



const NavbarItem = ({
    href,
    children,
    isActive
}: NavbarItemProps) => {
    return (

        <Button asChild
            variant="outline" className={(cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg", isActive && "bg-black text-white  hover:bg-black   hover:text-white"))} >

            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
};

export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen]=useState(false);
    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white" >
            <Link href={"/"} className={cn("flex items-center gap-2 px-5 text-2xl font-bold", poppins.className)}>
                MarketHive
            </Link>
            <NavbarSidebar items={navbarItems} open={isSidebarOpen} onopenChange={setIsSidebarOpen} />
            <div className=" items-center gap-4 hidden  lg:flex" >
                {navbarItems.map((item) => (
                    <NavbarItem key={item.href} href={item.href} isActive={pathname === item.href}  >{item.children} </NavbarItem>
                ))}
            </div>

            <div className="hidden lg:flex" >
                <Button variant={"secondary"} className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-blue-400 transitions-colors text-lg" >
                    <Link href={"/sign-in"} >Log In</Link></Button>

                <Button className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:text-black hover:bg-blue-400 transitions-colors text-lg" >
                    <Link href={"/sign-up"} >Start Selling</Link></Button>
            </div>

            <div className="flex lg:hidden items-center justify-center" >
               <Button variant={"ghost"}   onClick={() => setIsSidebarOpen(true)}  className="size-12 border-transparent bg-white" >
                 <MenuIcon/>
               </Button>
            </div>
        </nav>
    );
};