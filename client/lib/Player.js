export default class Player {
  constructor(id) {
    this.hand = [];
    this.id = id;
  }

  addCard(card) {
    this.hand.push(card);
  }

  playCard(card) {
    this.hand = this.hand.filter(c => {
      return `${c.color}-${c.type}` !== card;
    });
  }
}
