import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { eq, and, or, like } from "drizzle-orm";

import { db } from "@/server/db";

import { users } from "@/server/db/schema";

export const authRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),
  getByUserId: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db.select().from(users).where(eq(users.id, input));
  }),
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        role: z.enum(["customer", "merchant", "admin"]).default("customer"),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password, role } = input;
      const newUser = await db
        .insert(users)
        .values({
          email,
          role,
        })
        .returning();
      return newUser;
    }),
  editUser: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        email: z.string().email().optional(),
        password: z.string().min(8).optional(),
        role: z.enum(["customer", "merchant", "admin"]).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const {userId, email, role} = input;

      // todo: fix type safety
      const updateFields= {};
      if (email) updateFields.email = email;
      if (role) updateFields.role = role;

      const updatedUser = await db
        .update(users)
        .set(updateFields)
        .where(eq(users.id, userId))
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
});
