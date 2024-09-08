import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq } from "drizzle-orm";

import { db } from "@/server/db";

import { users, customers, merchants } from "@/server/db/schema";

export const authRouter = createTRPCRouter({
  // User
  getAll: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),
  getByUserId: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.select().from(users).where(eq(users.id, input));
  }),
  getMerchantIdByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const result = await db
        .select({ id: merchants.id })
        .from(merchants)
        .where(eq(merchants.userId, input));

      return result[0]?.id ?? "";
    }),
  getMerchantByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input: userId }) => {
      return await db
        .select()
        .from(merchants)
        .where(eq(merchants.userId, userId))
        .then((res) => res[0]);
    }),
  updateUserRole: publicProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(["customer", "merchant", "admin"]),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, role } = input;
      const updatedUser = await db
        .update(users)
        .set({
          role: role,
        })
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    }),

  deleteUser: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      const userId = input;

      // Optionally handle dependent data deletion or adjustments here
      await db.delete(users).where(eq(users.id, userId));

      return { success: true };
    }),

  // Customer
  createCustomer: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        username: z.string(),
        location: z.string().optional(),
        profilePictureUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId } = input;

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, userId));

      if (existingUser.length === 0) {
        throw new Error("User not found");
      }

      const createdCustomer = await db
        .insert(customers)
        .values(input)
        .returning();
      return createdCustomer;
    }),

  // Merchant
  createMerchant: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        merchantName: z.string(),
        location: z.string().optional(),
        merchantType: z.string().optional(),
        phoneNumber: z.string().optional(),
        socialMedia: z.string().optional(),
        profilePictureUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId } = input;

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, userId));

      if (existingUser.length === 0) {
        throw new Error("User not found");
      }

      const createdMerchant = await db
        .insert(merchants)
        .values(input)
        .returning();
      return createdMerchant;
    }),
});
