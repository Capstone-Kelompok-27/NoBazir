// Router mencocokkan permintaan HTTP yang masuk dengan kode atau fungsi tertentu
// berdasarkan pola URL dan metode HTTP untuk menangani berbagai rute dan tindakan
// dalam aplikasi.

// Kita akan pake beberapa library di sini.

// Ini adalah framework untuk router yang kita pakai
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Zod adalah library untuk validasi input agar sesuai skema yang sudah kita desain.
import { z } from "zod";

// Drizzle adalah ORM (Object-Relational Mapping), yaitu menghubungkan database dan
// mengubahnya menjadi objek yang bisa kita pakai di TypeScript.
// Ini kita hanya input metode untuk comparison dan sorting.
import { eq, desc, and, or, ilike } from "drizzle-orm";

// Kita import database yang kita gunakan dengan line ini.
import { db } from "@/server/db";

// Kita dapat memahami data dari database kita sebagai objek yang memiliki skema
// yang telah kita buat sebelumnya, di sini kita akan import skema posts dan users.
import { likes, posts, users } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

// MAIN CODE
// Ini daging kodenya, kita bakal export sebuah router untuk community
// dengan berbagai prosedur.
export const communityRouter = createTRPCRouter({
  // Kita pake publicProcedure karena ga perlu autentikasi atau otorisasi.
  // Pake async karena biar ga nunggu di sini.

  getAllPosts: publicProcedure.query(async () => {
    // Pake await biar nunggu query kelar sebelum ngasih respons.
    return await db.select().from(posts).orderBy(desc(posts.likeCount));
  }),

  getPostById: publicProcedure
    .input(z.string())
    .query(async ({ input: postId }) => {
      // Nah sekarang kita udah mulai pakai input, ya gunanya biar bisa dapet
      // post yang sesuai dengan ID yang disediakan input.
      return await db.select().from(posts).where(eq(posts.id, postId));
    }),

  getPostByInput: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db
      .select()
      .from(posts)
      .where(
        or(
          ilike(posts.postTitle, `%${input}%`),
          or(
            ilike(posts.postContent, `%${input}%`),
            ilike(posts.postTag, `%${input}%`),
          ),
        ),
      );
  }),

  getPostByTitle: publicProcedure
    .input(z.string())
    .query(async ({ input: title }) => {
      return await db
        .select()
        .from(posts)
        .where(ilike(posts.postTitle, `%${title}%`));
    }),

  getPostByContent: publicProcedure
    .input(z.string())
    .query(async ({ input: content }) => {
      return await db
        .select()
        .from(posts)
        .where(ilike(posts.postContent, `%${content}%`));
    }),

  getPostsByTag: publicProcedure
    .input(z.string())
    .query(async ({ input: postTag }) => {
      return await db
        .select()
        .from(posts)
        .where(ilike(posts.postTag, `%${postTag}%`));
    }),

  getPostsSortedByDateCreated: publicProcedure
    .input(z.enum(["asc", "desc"]))
    .query(async ({ input: parameter }) => {
      if (parameter === "desc") {
        return await db.select().from(posts).orderBy(desc(posts.createdAt));
      } else {
        return await db.select().from(posts).orderBy(posts.createdAt);
      }
    }),

  getPostsSortedByDateModified: publicProcedure
    .input(z.enum(["asc", "desc"]))
    .query(async ({ input: parameter }) => {
      if (parameter === "desc") {
        return await db.select().from(posts).orderBy(desc(posts.updatedAt));
      } else {
        return await db.select().from(posts).orderBy(posts.updatedAt);
      }
    }),

  getPostsSortedByLikeCount: publicProcedure
    .input(z.enum(["asc", "desc"]))
    .query(async ({ input: parameter }) => {
      if (parameter === "desc") {
        return await db.select().from(posts).orderBy(desc(posts.likeCount));
      } else {
        return await db.select().from(posts).orderBy(posts.likeCount);
      }
    }),

  getPostsByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input: creatorId }) => {
      return await db
        .select()
        .from(posts)
        .where(eq(posts.createdById, creatorId));
    }),

  getUserLikePost: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: postId }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not registered",
        });
      }

      const likePost = await ctx.db
        .select({ id: likes.id })
        .from(likes)
        .where(and(eq(likes.userId, userId), eq(likes.objectId, postId)))
        .then((res) => res[0]);

      if (likePost) {
        return true;
      } else {
        return false;
      }
    }),

  updateLikePost: publicProcedure
    .input(
      z.object({
        likeCount: z.number(),
        postId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not registered",
        });
      }

      const post = await ctx.db
        .select({ likeCount: posts.likeCount })
        .from(posts)
        .where(eq(posts.id, input.postId))
        .then((res) => res[0]);

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "post not found!",
        });
      }

      // Check if user already or did not like the post
      const likePost = await ctx.db
        .select({ id: likes.id })
        .from(likes)
        .where(and(eq(likes.userId, userId), eq(likes.objectId, input.postId)))
        .then((res) => res[0]);

      if (input.likeCount === post.likeCount + 1 && likePost) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already like this post!",
        });
      }

      if (input.likeCount === post.likeCount - 1 && !likePost) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User did not like this post!",
        });
      }

      // Insert new like data
      if (!likePost) {
        await ctx.db
          .insert(likes)
          .values({ userId: userId, objectId: input.postId });
      } else {
        await ctx.db
          .delete(likes)
          .where(
            and(eq(likes.objectId, input.postId), eq(likes.userId, userId)),
          );
      }

      // Update data
      await ctx.db
        .update(posts)
        .set({ likeCount: input.likeCount })
        .where(eq(posts.id, input.postId));

      // Return data
      return await ctx.db
        .select({ likeCount: posts.likeCount })
        .from(posts)
        .where(eq(posts.id, input.postId))
        .then((res) => res[0]);
    }),

  createPost: publicProcedure
    .input(
      z.object({
        createdById: z.string(),
        postTitle: z.string(),
        postPictureUrl: z.string().optional(),
        postContent: z.string(),
        postTag: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { createdById } = input;

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, createdById));

      if (existingUser.length === 0) {
        throw new Error("User not found");
      }

      const createdPost = await db.insert(posts).values(input).returning();
      return createdPost;
    }),
});
