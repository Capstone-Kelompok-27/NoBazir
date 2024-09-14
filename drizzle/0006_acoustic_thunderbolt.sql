CREATE TABLE IF NOT EXISTS "NoBazir_calorie_tracker" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"calorie" integer DEFAULT 0 NOT NULL,
	"date" varchar(10) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NoBazir_user_calorie" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"calorie_needs" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_calorie_tracker" ADD CONSTRAINT "NoBazir_calorie_tracker_user_id_NoBazir_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_user_calorie" ADD CONSTRAINT "NoBazir_user_calorie_user_id_NoBazir_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calorie_user_id_idx" ON "NoBazir_calorie_tracker" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calorie_idx" ON "NoBazir_calorie_tracker" USING btree ("calorie");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calorie_date_idx" ON "NoBazir_calorie_tracker" USING btree ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calorie_need_user_id_idx" ON "NoBazir_user_calorie" USING btree ("user_id");