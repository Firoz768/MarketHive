"use client";
import { Category } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useDropdownPosition } from "./use-dropdown-position";
import{SubcategoryMenu} from './subcategorymenu'
interface Props {
  category: Category;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropDown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {getDropdownPosition} = useDropdownPosition(dropdownRef);
  const dropdownPosition = getDropdownPosition();
  const onMouseEnter = () => {
    // Only open if there are subcategories
    if (category.subcategories && category.subcategories.length > 0) {
      setIsOpen(true);
    }
  };
  const onMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant={"elevated"}
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && "bg-white border-primary",
            isNavigationHovered && "bg-white border-primary"
          )}
        >
          {category.name}
        </Button>
      </div>
      <SubcategoryMenu category={category} isOpen={isOpen} position={dropdownPosition}/>
      {/* Conditionally render the caret */}
      {category.subcategories && category.subcategories.length >0 && (
        <div
          className={cn(
            "absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2 transition-opacity duration-200", // Added transition
            isOpen ? "opacity-100" : "opacity-0" // Corrected opacity application
          )}
        />
      )}
    </div>
    
  );
};