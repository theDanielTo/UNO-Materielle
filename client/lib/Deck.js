export default class Deck {
  constructor() {
    this.cardsDealt = [];
  }

  dealCard(card) {
    this.cardsDealt.push(card);
  }
}
