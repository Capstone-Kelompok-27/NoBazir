import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `NoBazir_${name}`);

// Variables Type
export type UserRole = "customer" | "merchant" | "admin" | null;

// Authentication
export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { enum: ["customer", "merchant", "admin"] }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// For Feature

export const merchants = createTable(
  "merchant",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    merchantName: varchar("merchant_name", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }),
    merchantType: varchar("merchant_type", { length: 255 }),
    phoneNumber: varchar("phone_number", { length: 13 }),
    socialMedia: varchar("social_media", { length: 2048 }),
    profilePictureUrl: text("profile_picture_url").default(
      "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/no-merchant-image.png-1724666448529?alt=media&token=a989466a-2f7c-4ad1-9fa4-afa4dcfe0c61",
    ),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (merchant) => ({
    merchantIdIdx: index("merchant_id_idx").on(merchant.id),
    merchantUserIdIdx: index("merchant_user_id_idx").on(merchant.userId),
    merchantNameIdx: index("merchant_name_idx").on(merchant.merchantName),
    merchantLocationIdx: index("merchant_location_idx").on(merchant.location),
    merchantCreatedAtIdx: index("merchant_created_at_idx").on(
      merchant.createdAt,
    ),
    merchantUpdatedAtIdx: index("merchant_updated_at_idx").on(
      merchant.updatedAt,
    ),
  }),
);

export const products = createTable(
  "product",
  {
    id: varchar("id", { length: 255 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID())
      .notNull(),
    createdByMerchantId: varchar("created_by_merchant_id", { length: 255 })
      .references(() => merchants.id)
      .notNull(),
    productName: varchar("product_name", { length: 255 }).notNull(),
    productType: varchar("product_type", { length: 255 }),
    price: integer("price").notNull(),
    expireDate: varchar("expire_date").notNull(),
    expireHour: integer("expire_hour").notNull().default(24),
    stock: integer("stock").notNull().default(0),
    pictureUrl: text("picture_url").default(
      "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96",
    ),
    totalCalorie: integer("total_calorie"),
    likeCount: integer("like_count").notNull().default(0),
    customerIdLikeList: varchar("customer_id_like_list", { length: 36 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (product) => ({
    productIdIdx: index("product_id_idx").on(product.id),
    productMerchantIdIdx: index("product_merchant_id_idx").on(
      product.createdByMerchantId,
    ),
    productNameIdx: index("product_name_idx").on(product.productName),
    productTypeIdx: index("product_type_idx").on(product.productType),
    priceIdx: index("price_idx").on(product.price),
    expireDateIdx: index("expire_date_idx").on(product.expireDate),
    expireHourIdx: index("expire_hour_idx").on(product.expireHour),
    productLikeCountIdx: index("product_like_count_idx").on(product.likeCount),
    productCustomerIdLikeListIdx: index("product_customer_id_like_list_idx").on(
      product.customerIdLikeList,
    ),
    productCreatedAtIdx: index("product_created_at_idx").on(product.createdAt),
    productUpdatedAtIdx: index("product_updated_at_idx").on(product.updatedAt),
  }),
);

export const customers = createTable(
  "customer",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }),
    coin: integer("coin").notNull().default(0),
    bazirPay: integer("bazirPay").notNull().default(0),
    profilePictureUrl: text("profile_picture_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (customer) => ({
    customerIdIdx: index("customer_id_idx").on(customer.id),
    customerUserIdIdx: index("customer_user_id_idx").on(customer.userId),
    customerUsernameIdx: index("customer_username_idx").on(customer.username),
    customerLocationIdx: index("customer_location_idx").on(customer.location),
    customerCreatedAtIdx: index("customer_created_at_idx").on(
      customer.createdAt,
    ),
    customerUpdatedAtIdx: index("customer_updated_at_idx").on(
      customer.updatedAt,
    ),
  }),
);

export const posts = createTable(
  "post",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    createdById: varchar("created_by_id")
      .references(() => users.id)
      .notNull(),
    postTitle: varchar("postTitle", { length: 255 }).notNull(),
    postPictureUrl: text("postPictureUrl"),
    postContent: text("postContent"),
    postTag: varchar("postTag", { length: 255 }),
    likeCount: integer("likeCount").notNull().default(0),
    userIdLikeList: varchar("userIdLikeList", { length: 255 }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (post) => ({
    postIdIdx: index("post_id_idx").on(post.id),
    postCreatedByIdIdx: index("post_created_by_id_idx").on(post.createdById),
    postTitleIdx: index("post_title_idx").on(post.postTitle),
    postTagIdx: index("post_tag_idx").on(post.postTag),
    postLikeCountIdx: index("post_like_count_idx").on(post.likeCount),
    postUserIdLikeListIdx: index("post_user_id_like_list").on(
      post.userIdLikeList,
    ),
    postCreatedAtIdx: index("post_created_at_idx").on(post.createdAt),
    postUpdatedAtIdx: index("post_updated_at_idx").on(post.updatedAt),
  }),
);

export const likes = createTable(
  "like",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 255 })
      .references(() => users.id)
      .notNull(),
    objectId: varchar("object_id", { length: 255 })
      .references(() => posts.id || products.id || merchants.id)
      .notNull(),
  },
  (like) => ({
    likeIdIdx: index("like_id_idx").on(like.id),
    userIdIdx: index("user_id_idx").on(like.userId),
    objectIdIdx: index("object_id_idx").on(like.objectId),
  }),
);

export const calorieTracker = createTable(
  "calorie_tracker",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 255 })
      .references(() => users.id)
      .notNull(),
    calorie: integer("calorie").notNull().default(0),
    date: varchar("date", { length: 10 }).notNull(),
    time: varchar("time", { length: 5 }),
    note: varchar("note", { length: 255 }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (calorie) => ({
    calorieUserIdIdx: index("calorie_user_id_idx").on(calorie.userId),
    calorieIdx: index("calorie_idx").on(calorie.calorie),
    calorieDateIdx: index("calorie_date_idx").on(calorie.date),
  }),
);

export const userCalorie = createTable(
  "user_calorie",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 255 })
      .references(() => users.id)
      .notNull(),
    calorieNeeds: integer("calorie_needs").notNull().default(0),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (user) => ({
    calorieNeedUserIdIdx: index("calorie_need_user_id_idx").on(user.userId),
  }),
);
