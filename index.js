const stringer = require('./num-to-string');

function numToFourActual(num, arr) {
  const text = stringer.numTostring(num);
  const digits = text.replace(/ /g,'').length;
  // arr.push({ num, text, digits });
  arr.push({ num, text });

  // if (digits == 4) return arr;
  if (num === 4) return arr;
  return numToFourActual(digits, arr);
}

function numToFour(num) {
  // TODO: validate input
  return numToFourActual(num, []);
}

module.exports = numToFour;
