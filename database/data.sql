INSERT into "users" ("userId", "username")
  VALUES (11111, 'daniel');
INSERT into "users" ("userId", "username")
  VALUES (22222, 'michael');
INSERT into "users" ("userId", "username")
  VALUES (33333, 'brian');

INSERT into "games" ("gameId", "gameTitle", "numPlayers", "isStarted")
  VALUES (11111, 'test', 4, false);
INSERT into "games" ("gameId", "gameTitle", "numPlayers", "isStarted")
  VALUES (22222, 'a game', 4, true);
INSERT into "games" ("gameId", "gameTitle", "numPlayers", "isStarted")
  VALUES (33333, 'ha', 4, false);
INSERT into "games" ("gameId", "gameTitle", "numPlayers", "isStarted")
  VALUES (44444, 'yep', 4, false);

INSERT into "lobbies" ("gameId", "userId")
  VALUES (11111, 11111);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (22222, 22222);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (33333, 33333);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (44444, 11111);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (44444, 22222);
INSERT into "lobbies" ("gameId", "userId")
  VALUES (44444, 33333);
