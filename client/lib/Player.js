export default class Player {
  constructor() {
    this.hand = [];
  }

  addCard(card) {
    this.hand.push(card);
  }
}
