set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."games" (
	"gameId" serial NOT NULL,
	"numPlayers" integer NOT NULL,
  "isStarted" BOOLEAN NOT NULL,
	CONSTRAINT "games_pk" PRIMARY KEY ("gameId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."lobbies" (
	"gameId" integer NOT NULL,
	"userId" VARCHAR(255) NOT NULL
) WITH (
  OIDS=FALSE
);





ALTER TABLE "lobbies" ADD CONSTRAINT "lobbies_fk0" FOREIGN KEY ("gameId") REFERENCES "games"("gameId");
