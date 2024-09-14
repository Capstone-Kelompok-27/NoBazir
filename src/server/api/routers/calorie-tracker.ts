import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { eq, ilike, lte, and, gte, asc, desc } from "drizzle-orm";
import { calorieTracker, userCalorie } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const calorieRouter = createTRPCRouter({
  getUserCalorieByDate: protectedProcedure
    .input(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
    .query(async ({ ctx, input: date }) => {
      const userId = ctx.session.user.id;
      const yearMonth = date.slice(0, 7);

      try {
        return await ctx.db
          .select()
          .from(calorieTracker)
          .where(
            and(
              eq(calorieTracker.userId, userId),
              ilike(calorieTracker.date, `%${yearMonth}%`),
            ),
          )
          .orderBy(asc(calorieTracker.date));
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can not access data from calorieTracker",
        });
      }
    }),

  getUserCalorieNeeds: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db
        .select({ calorieNeeds: userCalorie.calorieNeeds })
        .from(userCalorie)
        .where(eq(userCalorie.userId, userId))
        .then((res) => res[0]);
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Can not access data from userCalorie",
      });
    }
  }),

  createUserCalorie: protectedProcedure
    .input(
      z.object({
        calorie: z.number().positive(),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { calorie, date } = input;

      try {
        await ctx.db.insert(calorieTracker).values({
          userId: userId,
          calorie: calorie,
          date: date,
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can not access data from calorieTracker",
        });
      }
    }),

  createUserCalorieNeeds: protectedProcedure
    .input(z.number().positive())
    .mutation(async ({ ctx, input: calorieNeeds }) => {
      const userId = ctx.session.user.id;

      try {
        const userCalorieData = await ctx.db
          .select({ id: userCalorie.id })
          .from(userCalorie)
          .where(eq(userCalorie.userId, userId));

        if (userCalorieData) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User calorie needs already created!",
          });
        }

        await ctx.db.insert(userCalorie).values({
          userId: userId,
          calorieNeeds: calorieNeeds,
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can not access data from userCalorie",
        });
      }
    }),

  updateUserCalorie: protectedProcedure
    .input(
      z.object({
        calorie: z.number().positive(),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { calorie, date } = input;

      try {
        await ctx.db
          .update(calorieTracker)
          .set({
            calorie: calorie,
            date: date,
          })
          .where(eq(calorieTracker.userId, userId));
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can not access data from calorieTracker",
        });
      }
    }),

  updateUserCalorieNeeds: protectedProcedure
    .input(z.number().positive())
    .mutation(async ({ ctx, input: calorieNeeds }) => {
      const userId = ctx.session.user.id;

      try {
        await ctx.db
          .update(userCalorie)
          .set({
            userId: userId,
            calorieNeeds: calorieNeeds,
          })
          .where(eq(userCalorie.userId, userId));
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can not access data from userCalorie",
        });
      }
    }),

  deleteUserCalorie: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      const userId = ctx.session.user.id;

      try {
        const calorieById = await ctx.db
          .select({ id: calorieTracker.id })
          .from(calorieTracker)
          .where(eq(calorieTracker.id, id))
          .then((res) => res[0]);

        if (!calorieById) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Calorie by id not found!",
          });
        }

        await ctx.db
          .delete(calorieTracker)
          .where(and(eq(calorieTracker, userId), eq(calorieTracker.id, id)));
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can not access data from calorieTracker",
        });
      }
    }),
});
