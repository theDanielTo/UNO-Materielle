import Player from './Player';
import UnoCards from './UnoCards';
import shuffleDeck from './shuffleDeck';

const HAND_SIZE = 7;

export default function gameStart(numPlayers) {
  const players = [];
  const shuffledDeck = shuffleDeck(UnoCards);

  for (let i = 0; i < numPlayers; i++) {
    players.push(new Player(i + 1, shuffledDeck.splice(0, HAND_SIZE)));
  }

  let randomIndex = Math.floor(Math.random() * 99);
  while (true) {
    if (shuffledDeck[randomIndex].type === 'skip' ||
      shuffledDeck[randomIndex].type === 'reverse' ||
      shuffledDeck[randomIndex].type === 'draw2') {
      randomIndex = Math.floor(Math.random() * 99);
    } else break;
  }

  const topColor = shuffledDeck[randomIndex].color;
  const topType = shuffledDeck[randomIndex].type;
  const topCard = `${topColor}-${topType}`;

  const playedCards = shuffledDeck.splice(randomIndex, 1);

  return { players, shuffledDeck, topCard, playedCards };
}
