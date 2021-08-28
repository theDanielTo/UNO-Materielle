export default class Player {
  constructor(id, hand) {
    this.id = id;
    this.hand = hand;
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
