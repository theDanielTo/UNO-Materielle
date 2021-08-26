export default class Player {
  constructor(id) {
    this.hand = [];
    this.id = id;
  }

  addCard(card) {
    this.hand.push(card);
  }
}
