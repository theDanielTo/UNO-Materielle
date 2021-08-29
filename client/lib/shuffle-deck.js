export default function shuffleDeck(deck) {
  // Fisher-Yates shuffle
  let curIndex = deck.length;
  let randomIndex;

  while (curIndex !== 0) {
    randomIndex = Math.floor(Math.random() * curIndex);
    curIndex--;

    [deck[curIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[curIndex]];
  }

  return deck;
}
