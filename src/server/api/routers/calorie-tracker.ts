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
          .select({
            calorie: calorieTracker.calorie,
            date: calorieTracker.date,
            time: calorieTracker.time,
            note: calorieTracker.note,
          })
          .from(calorieTracker)
          .where(
            and(
              eq(calorieTracker.userId, userId),
              ilike(calorieTracker.date, `%${yearMonth}%`),
            ),
          )
          .orderBy(asc(calorieTracker.date), asc(calorieTracker.time));
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
        date: z.string().default(""),
        time: z.string().default(""),
        note: z.string().default(""),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      console.log(userId);
      const { calorie, note } = input;
      let { date, time } = input;

      // default date
      if (date === "") {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        date = `${year}-${month}-${day}`;
      }

      // default time
      if (time === "") {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        time = `${hours}:${minutes}`;
      }

      try {
        await ctx.db.insert(calorieTracker).values({
          userId: userId,
          calorie: calorie,
          date: date,
          time: time,
          note: note,
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
        time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/), // hh:mm format,
        note: z.string().optional().default(""),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { calorie, date, time, note } = input;

      try {
        await ctx.db
          .update(calorieTracker)
          .set({
            calorie: calorie,
            date: date,
            time: time,
            note: note,
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
