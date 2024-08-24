CREATE TABLE IF NOT EXISTS "NoBazir_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "NoBazir_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_customer" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"username" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"coin" integer DEFAULT 0 NOT NULL,
	"bazirPay" integer DEFAULT 0 NOT NULL,
	"profile_picture_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_merchant" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"merchant_name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"merchant_type" varchar(255),
	"phone_tumber" varchar(13),
	"social_media" varchar(2048),
	"profile_picture_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_post" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_by_id" varchar NOT NULL,
	"postTitle" varchar(255) NOT NULL,
	"postPictureUrl" text,
	"postContent" text,
	"postTag" varchar(255),
	"likeCount" integer DEFAULT 0 NOT NULL,
	"userIdLikeList" varchar(36),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_product" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"created_by_merchant_id" varchar(255) NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"product_type" varchar(255),
	"price" integer NOT NULL,
	"expire_date" date NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"picture_url" text,
	"total_calorie" real,
	"like_count" integer DEFAULT 0 NOT NULL,
	"customer_id_like_list" varchar(36),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"role" varchar DEFAULT 'customer'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "NoBazir_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_account" ADD CONSTRAINT "NoBazir_account_user_id_NoBazir_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_customer" ADD CONSTRAINT "NoBazir_customer_user_id_NoBazir_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_merchant" ADD CONSTRAINT "NoBazir_merchant_user_id_NoBazir_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_post" ADD CONSTRAINT "NoBazir_post_created_by_id_NoBazir_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_product" ADD CONSTRAINT "NoBazir_product_created_by_merchant_id_NoBazir_merchant_id_fk" FOREIGN KEY ("created_by_merchant_id") REFERENCES "public"."NoBazir_merchant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_session" ADD CONSTRAINT "NoBazir_session_user_id_NoBazir_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "NoBazir_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_id_idx" ON "NoBazir_customer" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_user_id_idx" ON "NoBazir_customer" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_username_idx" ON "NoBazir_customer" USING btree ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_location_idx" ON "NoBazir_customer" USING btree ("location");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_created_at_idx" ON "NoBazir_customer" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "customer_updated_at_idx" ON "NoBazir_customer" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "merchant_id_idx" ON "NoBazir_merchant" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "merchant_user_id_idx" ON "NoBazir_merchant" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "merchant_name_idx" ON "NoBazir_merchant" USING btree ("merchant_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "merchant_location_idx" ON "NoBazir_merchant" USING btree ("location");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "merchant_created_at_idx" ON "NoBazir_merchant" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "merchant_updated_at_idx" ON "NoBazir_merchant" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_id_idx" ON "NoBazir_post" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_created_by_id_idx" ON "NoBazir_post" USING btree ("created_by_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_title_idx" ON "NoBazir_post" USING btree ("postTitle");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_tag_idx" ON "NoBazir_post" USING btree ("postTag");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_like_count_idx" ON "NoBazir_post" USING btree ("likeCount");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_user_id_like_list" ON "NoBazir_post" USING btree ("userIdLikeList");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_created_at_idx" ON "NoBazir_post" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_updated_at_idx" ON "NoBazir_post" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_id_idx" ON "NoBazir_product" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_merchant_id_idx" ON "NoBazir_product" USING btree ("created_by_merchant_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_name_idx" ON "NoBazir_product" USING btree ("product_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_type_idx" ON "NoBazir_product" USING btree ("product_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "price_idx" ON "NoBazir_product" USING btree ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expire_date_idx" ON "NoBazir_product" USING btree ("expire_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_like_count_idx" ON "NoBazir_product" USING btree ("like_count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_customer_id_like_list_idx" ON "NoBazir_product" USING btree ("customer_id_like_list");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_created_at_idx" ON "NoBazir_product" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_updated_at_idx" ON "NoBazir_product" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "NoBazir_session" USING btree ("user_id");