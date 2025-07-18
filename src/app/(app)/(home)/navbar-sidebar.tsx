import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
interface NavbarItem {
    href: string;
    children: React.ReactNode;
}
interface Props {
    items: NavbarItem[];
    open: boolean;
    onopenChange: (open: boolean) => void;
}
export const NavbarSidebar = ({ items, open, onopenChange }: Props) => {
    return (
        <Sheet open={open} onOpenChange={onopenChange} >

            <SheetContent side="left" className="p-0 transition-none" >
                <SheetHeader className="p-4 border-b" >

                    <SheetTitle>Menu</SheetTitle>

                </SheetHeader>
                <ScrollArea className="flex flex-col pb-2 overflow-y-auto h-full" >
                    {items.map((item) => (
                        <Link key={item.href} href={item.href} className="w-full text-left p-4 hover:bg-black hover:text-white  flex items-center text-base font-medium" 
                        onClick={() => onopenChange(false)}
                        >
                            {item.children}
                        </Link>
                    ))}
                    <div className="border-t" >
                        <Link href={"/sign-in"} className="w-full text-left p-4 hover:bg-black hover:text-white  flex items-center text-base font-medium" onClick={() => onopenChange(false)}>
                            Log In
                        </Link>
                        <Link href={"/sign-up"} className="w-full text-left p-4 hover:bg-black hover:text-white  flex items-center text-base font-medium" onClick={() => onopenChange(false)}>
                            Start Selling
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
};