import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq, ilike, lte, and, gte, asc, desc } from "drizzle-orm";

import { db } from "@/server/db";

import { merchants, products } from "@/server/db/schema";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase.config";

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
        .where(ilike(products.productName, `%${productName}%`));
    }),

  getProductByType: publicProcedure
    .input(z.string())
    .query(async ({ input: productType }) => {
      return await db
        .select()
        .from(products)
        .where(eq(products.productType, productType));
    }),

  getProductByLikeCount: publicProcedure
    .input(z.enum(["asc", "desc"]))
    .query(async ({ input: param }) => {
      if (param === "asc") {
        return await db
          .select()
          .from(products)
          .orderBy(asc(products.likeCount));
      } else {
        return await db
          .select()
          .from(products)
          .orderBy(desc(products.likeCount));
      }
    }),

  getProductSortedByExpire: publicProcedure
    .input(z.enum(["asc", "desc"]))
    .query(async ({ input: param }) => {
      if (param === "asc") {
        return await db
          .select()
          .from(products)
          .orderBy(asc(products.expireDate), asc(products.expireHour));
      } else {
        return await db
          .select()
          .from(products)
          .orderBy(desc(products.expireDate), desc(products.expireHour));
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

  getProductById: publicProcedure
    .input(z.string())
    .query(async ({ input: productId }) => {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.id, productId));
      return result ?? undefined;
    }),

  getProductByMerchantId: publicProcedure
    .input(z.string())
    .query(async ({ input: merchantId }) => {
      return await db
        .select()
        .from(products)
        .where(eq(products.createdByMerchantId, merchantId));
    }),

  getProductIdByMerchantId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.createdByMerchantId, input));
    }),

  createProduct: publicProcedure
    .input(
      z.object({
        createdByMerchantId: z.string(),
        productName: z.string(),
        productType: z.string().optional(),
        price: z.number(),
        expireDate: z.string(),
        expireHour: z.number().optional(),
        stock: z.number().optional(),
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

  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
        productName: z.string().optional(),
        productType: z.string().optional(),
        price: z.number().optional(),
        expireDate: z.string().optional(),
        expireHour: z.number().optional(),
        stock: z.number().optional(),
        pictureUrl: z.string().optional(),
        totalCalorie: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const updatedProduct = await db
        .update(products)
        .set(input)
        .where(eq(products.id, input.id))
        .returning();
      return updatedProduct;
    }),

    deleteProduct: publicProcedure.input(z.string()).mutation(async ({input}) => {
      return await db.delete(products).where(eq(products.id, input))
    }),

  createProductPictureUrl: publicProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.string(),
        base64Data: z.string(),
      }),
    )
    .output(z.string().url())
    .mutation(async ({ input }) => {
      const { name, type, base64Data } = input;

      // Convert base64 string to Uint8Array
      const byteString = atob(base64Data.split(",")[1] as string);

      const uint8Array = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type });
      const file = new File([blob], name, { type });
      const storageRef = ref(storage, `${file.name}-${Date.now()}`);

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return downloadUrl;
    }),
});
