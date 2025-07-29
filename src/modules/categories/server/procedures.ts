import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";
import { getPayload } from 'payload';
export const CategoriesRouter = createTRPCRouter({

    getMany: baseProcedure.query(async ({ctx}) => {

        const data = await ctx.db.find({
            collection: "categories",
            depth: 1,
            pagination: false,
            where: {
                parent: {
                    exists: false,
                },
            },
            sort: "name",
        });
        const formattedData = data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                ...(doc as Category),
                subcategories: undefined,
            }))
        }));

        return formattedData;
    }),
});