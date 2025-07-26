"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CustomCategory } from "../types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
    Open: boolean,
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[],
};
export const CategoriesSideBar = ({ Open, onOpenChange, data }: Props) => {
    const router = useRouter();
    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

    const currentCategories = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
        setParentCategories(null);
        setSelectedCategory(null);
    };

    const backgroundColor = selectedCategory?.color || "white";

    const handleBackClick = () => {
        setParentCategories(null);
        setSelectedCategory(null);
    };

    const handleCategoryClick = (category: CustomCategory) => {
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CustomCategory[]); // Note: The image shows CustomCategory[I] which is likely a typo and should be CustomCategory[]
            setSelectedCategory(category);
        } else {
            // This is a leaf category (no subcategories)
            if (parentCategories && selectedCategory) {
                // This is a subcategory - navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                // This is a main category - navigate to /category
                if (category.slug === "all") {
                    router.push("/");
                } else {
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    };
    return (
        <Sheet open={Open} onOpenChange={handleOpenChange} >
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b" >
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col pb-2 overflow-y-auto h-full" >
                    {parentCategories && (
                        <button
                            onClick={(handleBackClick) }
                            className="w-full text-left p-4 hover:bg-black hover:text-white  flex items-center text-base font-medium"
                        >
                            <ChevronLeftIcon className="mr-2 size-4" /> Back
                        </button>
                    )}
                    {currentCategories.map((category) => (
                        <button
                            key={category.slug}
                            className="w-full text-left p-4 hover:bg-black hover:text-white  flex justify-between items-center text-base font-medium"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className=" size-4" />
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};