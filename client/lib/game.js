import Player from './Player';
import dealCard from './dealCard';

const HAND_SIZE = 7;

export default function game() {
  const player1 = new Player(1);
  const player2 = new Player(2);
  const player3 = new Player(3);
  const player4 = new Player(4);

  [player1, player2, player3, player4].forEach(player => {
    for (let i = 0; i < HAND_SIZE; i++) player.addCard(dealCard());
  });

  return [player1, player2, player3, player4];
}
