import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { CategoriesRouter } from '@/modules/categories/server/procedures';
export const appRouter = createTRPCRouter({
  categories : CategoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;