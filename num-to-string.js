const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'ninteen'];
const tens = ['zero', 'ten', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const powers = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion'];

module.exports = {
  numTostring,
  parseOneTriplet,
};

function numTostring(num) {
  if (typeof num != 'number') throw Error('Input must be a number');

  if (num == 0) return 'zero';
  num = Math.floor(num); // do not deal with decimals for now

  let numString = '';
  if (num < 0) {
    numString += 'negative';
    num *= -1;
  }

  // go through in three digit sections (triplets)
  const digitStr = num.toString()
  const digits = digitStr.length;
  const triplets = Math.ceil(digits / 3);
  let start = 0;
  let end = digits % 3 || 3;
  let power = triplets - 1;
  while (end <= digits) {
    // grab one section and coerce back into number
    const str = parseOneTriplet(+digitStr.slice(start, end));
    if (str) {
      numString += ` ${str} ${powers[power]}`;
    }
    start = end;
    end += 3;
    power -= 1;
  }

  return numString.trim();
}

function parseOneTriplet(num) {
  x = num;
  // check for 0 first, for efficeincy
  // if 0, return empty string
  // we dont want to return "zero thousand"
  // the main function will return the "zero" string
  if (num == 0) return '';

  let str = '';

  const hundred = Math.floor(num / 100);
  if (hundred) str += ones[hundred] + ' hundred';
  num -= hundred * 100;

  const tensDigit = Math.floor(num / 10);
  if (tensDigit) {
    if (hundred) str += ' ';
    if (tensDigit == 1) {
      // number is a teen
      str += teens[num - 10];
      return str;
    }
    str += tens[tensDigit];
  }
  num -= tensDigit * 10;

  if (num) {
    if (tensDigit) str += ' ';
    str += ones[num];
  }
  return str;
}
