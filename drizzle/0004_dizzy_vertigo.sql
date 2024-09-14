CREATE TABLE IF NOT EXISTS "NoBazir_like" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"type" varchar NOT NULL,
	"object_id" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "NoBazir_post" ALTER COLUMN "userIdLikeList" SET DATA TYPE varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_like" ADD CONSTRAINT "NoBazir_like_user_id_NoBazir_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."NoBazir_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "NoBazir_like" ADD CONSTRAINT "NoBazir_like_object_id_NoBazir_post_id_fk" FOREIGN KEY ("object_id") REFERENCES "public"."NoBazir_post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "like_id_idx" ON "NoBazir_like" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "NoBazir_like" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "type_idx" ON "NoBazir_like" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "object_id_idx" ON "NoBazir_like" USING btree ("object_id");