export default function cardType(num) {
  switch (num % 14) {
    case 10:
      return 'skip';
    case 11:
      return 'reverse';
    case 12:
      return 'draw2';
    case 13:
      if (Math.floor(num / 14) >= 4) {
        return 'draw4';
      } else {
        return 'wild';
      }
    default:
      return num % 14;
  }
}
