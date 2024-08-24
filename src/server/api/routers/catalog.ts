import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq, ilike, lte, and, gte } from "drizzle-orm";

import { db } from "@/server/db";

import { products } from "@/server/db/schema";

export const catalogRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async () => {
    return await db.select().from(products);
  }),
  getProductByName: publicProcedure
    .input(z.string())
    .query(async ({ input: productName }) => {
      return await db
        .select()
        .from(products)
        .where(ilike(products.productName, productName));
    }),
  getProductByType: publicProcedure
    .input(z.string())
    .query(async ({ input: productType }) => {
      return await db
        .select()
        .from(products)
        .where(eq(products.productType, productType));
    }),
  getProductByLikeCount: publicProcedure.query(async () => {
    return await db.select().from(products).orderBy(products.likeCount);
  }),
  getProductByExpireDate: publicProcedure.query(async () => {
    return await db.select().from(products).orderBy(products.expireDate);
  }),
  getProductByPriceRange: publicProcedure
    .input(
      z.object({
        minPrice: z.number().int(),
        maxPrice: z.number().int(),
      }),
    )
    .query(async ({ input }) => {
      return await db
        .select()
        .from(products)
        .where(
          and(
            gte(products.price, input.maxPrice),
            lte(products.price, input.minPrice),
          ),
        );
    }),
});
