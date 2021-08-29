import cardColor from './cardColor';
import cardType from './cardType';

const DECK_SIZE = 112;

export default function dealCard() {
  const num = Math.floor(Math.random() * DECK_SIZE);
  return { color: cardColor(num), type: cardType(num), id: num };
}
