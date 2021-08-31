set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."games" (
	"gameId" serial NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "code" VARCHAR(255) NOT NULL
) WITH (
  OIDS=FALSE
);
