import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq, ilike, lte } from "drizzle-orm";

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
  getProductByMaxPrice: publicProcedure
    .input(z.number())
    .query(async ({ input: maxPrice }) => {
      return await db
        .select()
        .from(products)
        .where(lte(products.price, maxPrice));
    }),
  getProductByID: publicProcedure
    .input(z.string())
    .query(async ({ input: productId }) => {
      return await db
        .select()
        .from(products)
        .where(eq(products.id, productId));
    }),
  getProductByMerchantID: publicProcedure
    .input(z.string())
    .query(async ({ input: merchantId }) => {
      return await db
        .select()
        .from(products)
        .where(eq(products.createdByMerchantId, merchantId));
    })
});
