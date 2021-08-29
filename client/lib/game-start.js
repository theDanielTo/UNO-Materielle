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

  return { players, shuffledDeck };
}
