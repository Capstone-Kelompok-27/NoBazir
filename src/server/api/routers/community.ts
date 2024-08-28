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
import { eq, lte, gte, asc, desc } from "drizzle-orm";

// Kita import database yang kita gunakan dengan line ini.
import { db } from "@/server/db";

// Kita dapat memahami data dari database kita sebagai objek yang memiliki skema
// yang telah kita buat sebelumnya, di sini kita akan import skema posts dan users.
import { posts, users } from "@/server/db/schema";

// MAIN CODE
// Ini daging kodenya, kita bakal export sebuah router untuk community
// dengan berbagai prosedur.
export const communityRouter = createTRPCRouter({
  // Kita pake publicProcedure karena ga perlu autentikasi atau otorisasi.
  // Pake async karena biar ga nunggu di sini.

  getAllPosts: publicProcedure.query(async () => {
    // Pake await biar nunggu query kelar sebelum ngasih respons.
    return await db.select().from(posts);
  }),

  getPostById: publicProcedure
    .input(z.string())
    .query(async ({ input: postId }) => {
      // Nah sekarang kita udah mulai pakai input, ya gunanya biar bisa dapet
      // post yang sesuai dengan ID yang disediakan input.
      return await db.select().from(posts).where(eq(posts.id, postId));
    }),

  getPostsByTag: publicProcedure
    .input(z.string())
    .query(async ({ input: postTag }) => {
      return await db.select().from(posts).where(eq(posts.postTag, postTag));
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
