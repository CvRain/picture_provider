CREATE TABLE IF NOT EXISTS "users" (
	"_id" serial PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_login" timestamp
);
