export default function shuffleDeck(deck) {
  for (let i = 0; i < deck.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}
