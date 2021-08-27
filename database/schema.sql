set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."games" (
	"gameId" serial NOT NULL,
	"gameTitle" VARCHAR(255) NOT NULL,
	"numPlayers" integer NOT NULL,
	CONSTRAINT "games_pk" PRIMARY KEY ("gameId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" VARCHAR(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."lobbies" (
	"gameId" integer NOT NULL,
	"userId" integer NOT NULL
) WITH (
  OIDS=FALSE
);





ALTER TABLE "lobbies" ADD CONSTRAINT "lobbies_fk0" FOREIGN KEY ("gameId") REFERENCES "games"("gameId");
ALTER TABLE "lobbies" ADD CONSTRAINT "lobbies_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
