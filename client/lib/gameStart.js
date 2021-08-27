import Player from './Player';
import dealCard from './dealCard';

const HAND_SIZE = 7;

export default function gameStart(numPlayers) {
  const players = [];
  for (let i = 0; i < numPlayers; i++) {
    players.push(new Player(i + 1));
  }

  players.forEach(player => {
    for (let j = 0; j < HAND_SIZE; j++) player.addCard(dealCard());
  });
  return players;
}
