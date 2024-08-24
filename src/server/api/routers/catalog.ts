import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq, like } from "drizzle-orm";

import { db } from "@/server/db";

import { merchants, products } from "@/server/db/schema";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

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
        .where(like(products.productName, input));
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
});
