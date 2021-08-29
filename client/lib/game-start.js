import Player from './Player';
import UnoCards from './UnoCards';
import shuffleDeck from './shuffleDeck';

const HAND_SIZE = 7;

const INVALID_ACTION_INDICES = [
  19, 20, 21, 22, 23, 24,
  44, 45, 46, 47, 48, 49,
  69, 70, 71, 72, 73, 74
];

export default function gameStart(numPlayers) {
  const players = [];
  const shuffledDeck = shuffleDeck(UnoCards);

  for (let i = 0; i < numPlayers; i++) {
    players.push(new Player(i + 1, shuffledDeck.splice(0, HAND_SIZE)));
  }

  let randomIndex = Math.floor(Math.random() * 93);
  while (INVALID_ACTION_INDICES.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * 93);
  }

  const topColor = shuffledDeck[randomIndex].color;
  const topType = shuffledDeck[randomIndex].type;
  const topCard = `${topColor}-${topType}`;

  const playedCards = shuffledDeck.splice(randomIndex, 1);

  return { players, shuffledDeck, topCard, playedCards };
}
