import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq, ilike, lte, and, gte, asc, desc } from "drizzle-orm";

import { db } from "@/server/db";

import { merchants, products } from "@/server/db/schema";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

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
    return await db.select().from(products).orderBy(desc(products.likeCount));
  }),


  getProductSortedByExpireDate: publicProcedure
    .input(z.enum(["asc", "desc"]))
    .query(async ({ input: param }) => {
      if (param === "asc") {
        return await db
          .select()
          .from(products)
          .orderBy(asc(products.expireDate));
      } else {
        return await db
          .select()
          .from(products)
          .orderBy(desc(products.expireDate));
      }
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
            lte(products.price, input.maxPrice),
            gte(products.price, input.minPrice),
          ),
        );
    }),


  getProductSortedByPrice: publicProcedure
    .input(z.enum(["asc", "desc"]))
    .query(async ({ input: param }) => {
      if (param === "asc") {
        return await db.select().from(products).orderBy(asc(products.price));
      } else {
        return await db.select().from(products).orderBy(desc(products.price));
      }
    }),


  createProduct: publicProcedure
    .input(
      z.object({
        createdByMerchantId: z.string(),
        productName: z.string(),
        productType: z.string().optional(),
        price: z.number(),
        expireDate: z.string(),
        stock: z.number(),
        pictureUrl: z.string().optional(),
        totalCalorie: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { createdByMerchantId } = input;

      const existingMerchant = await db
        .select()
        .from(merchants)
        .where(eq(merchants.id, createdByMerchantId));

      if (existingMerchant.length === 0) {
        throw new Error("Merchant not found");
      }

      const createdProduct = await db
        .insert(products)
        .values(input)
        .returning();
      return createdProduct;
    }),

    
  createProductPictureUrl: publicProcedure
    .input(z.object({
      file: z.instanceof(File),
    }))
    .output(z.string().url())
    .mutation(async ({ input }) => {
      const storage = getStorage();
      const storageRef = ref(storage, `${input.file.name}-${Date.now()}`);

      // 'file' comes from the Blob or File API
      const snapshot = await uploadBytes(storageRef, input.file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return downloadUrl
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
    }),
});
