import Player from './Player';
import { dealCard } from './index';

const HAND_SIZE = 7;

export default function game() {
  const player1 = new Player();
  const player2 = new Player();
  const player3 = new Player();
  const player4 = new Player();

  [player1, player2, player3, player4].forEach(player => {
    for (let i = 0; i < HAND_SIZE; i++) player.addCard(dealCard());
  });

  return [player1, player2, player3, player4];
}
