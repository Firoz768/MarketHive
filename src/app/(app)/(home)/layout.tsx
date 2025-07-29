import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters, SearchFiltersLoading } from "./search-filters";
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
interface Props {
  children: React.ReactNode;
};
const layout = async ({ children }: Props) => {

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  );


  return (
    <div className="flex flex-col min-h-screen" >
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>

        <Suspense fallback={<SearchFiltersLoading/>}>
          < SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]" >
        {children}
      </div>

      <Footer />
    </div>
  )
}
export default layout