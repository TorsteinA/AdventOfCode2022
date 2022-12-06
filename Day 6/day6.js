// https://adventofcode.com/2022/day/6

const fs = require("fs");
let content = fs.readFileSync('input.txt', (err, data) => {
  if (err) throw err;
}).toString();

function sharesChar(chars) {
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    for (let ii = 0; ii < chars.length; ii++) {
      if (i === ii) continue;
      const char2 = chars[ii];
      if (char === char2) return true;
    }
  }

  return false;
}

const charArr = Array.from(content);

// Part 1
for (let i = 0; i < charArr.length; i++) {
  if (i < 4) continue;

  const char = charArr[i];
  const prev1 = charArr[i - 1];
  const prev2 = charArr[i - 2];
  const prev3 = charArr[i - 3];

  if (sharesChar([char, prev1, prev2, prev3])) continue;

  // packet marker found
  console.log('Marker found ' + (i + 1)); // i+1 is the answer to part 1
  break;
}

// Part 2
for (let i = 0; i < charArr.length; i++) {
  if (i < 14) continue;

  let latest14 = [];
  for (let ii = 0; ii < 14; ii++) {
    latest14[ii] = charArr[i - ii];
  }

  if (sharesChar(latest14)) continue;

  // message marker found
  console.log('Message Marker found: ' + (i + 1));
  break;
}