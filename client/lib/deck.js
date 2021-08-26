export default class Deck {
  constructor() {
    this.playedCards = [];
  }

  playCard(card) {
    this.playedCards.push(card);
  }
}
