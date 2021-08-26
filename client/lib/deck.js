export default class Deck {
  constructor() {
    this.playedCards = [];
    this.topCard = {};
  }

  playCard(card) {
    this.playedCards.push(card);
    this.topCard = card;
  }
}
