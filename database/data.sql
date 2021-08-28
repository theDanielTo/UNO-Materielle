INSERT into "users" ("userId", "username")
  VALUES (1, 'daniel');
INSERT into "users" ("userId", "username")
  VALUES (2, 'michael');
INSERT into "users" ("userId", "username")
  VALUES (3, 'brian');

INSERT into "games" ("gameId", "gameTitle", "numPlayers")
  VALUES (11111, 'test', 4);
INSERT into "games" ("gameId", "gameTitle", "numPlayers")
  VALUES (22222, 'a game', 4);
INSERT into "games" ("gameId", "gameTitle", "numPlayers")
  VALUES (33333, 'ha', 4);
INSERT into "games" ("gameId", "gameTitle", "numPlayers")
  VALUES (44444, 'yep', 4);

INSERT into "lobbies" ("gameId", "userId")
  VALUES (11111, 1);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (22222, 2);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (33333, 3);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (44444, 1);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (44444, 2);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (44444, 3);
