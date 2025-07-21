import { Category } from "@/payload-types";
import { CategoryDropDown } from "./category-dropdown";
interface Props{
    data : any;
};
export const Categories=({data}:Props)=>{
    return(
        <div className="relative w-full" >
          <div className="flex flex-nowrap items-center" >
              {data.map((category: Category) => (
               <div key={category.id} >
                <CategoryDropDown category={category} isActive={false} isNavigationHovered={false}/>
               </div>
            ))}
          </div>
        </div>
    )
}