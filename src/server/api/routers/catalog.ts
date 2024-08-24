import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq, like } from "drizzle-orm";

import { db } from "@/server/db";

import { products } from "@/server/db/schema";

export const catalogRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async () => {
    return await db.select().from(products);
  }),
  getProductByName: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db
        .select()
        .from(products)
        .where(like(input, products.productName));
    }),
});
