"use client"
import { SearchIcon,ListFilterIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CategoriesSideBar } from "./categories-sidebar";
import { SearchFilters } from "./index";
import { CustomCategory } from "../types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface Props{
    disabled?:boolean,
    data: CustomCategory[],
}
export const SearchInput=({disabled,data}:Props)=>{
    const [isSideBarOpen,setIsSideBarOpen]=useState(false)
    return(
    <div className="flex items-center gap-2 w-full mt-3" >
        <CategoriesSideBar data={data} Open={isSideBarOpen} onOpenChange={setIsSideBarOpen} />
        <div className="relative w-full " >
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search Products" disabled={disabled}  />
        </div>
        <Button variant={"elevated"} className="size-12 shrink-0 flex lg:hidden"   onClick={()=>{
            setIsSideBarOpen(true)
        }} >
      <ListFilterIcon/>
        </Button>
       
    </div>

    )}