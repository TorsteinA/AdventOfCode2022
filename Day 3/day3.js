// https://adventofcode.com/2022/day/3

const fs = require("fs");
let content = fs.readFileSync('input.txt', (err, data) => {
  if (err) throw err;
}).toString();

const ruckSacks = content.split('\n');
const ruckSackContents = ruckSacks.map(sack => {
  const sackLength = sack.length;
  const halfLength = sackLength/2;
  const firstHalf = sack.substring(0, halfLength);
  const secondHalf = sack.substring(halfLength, sackLength);
  return {first: firstHalf, second: secondHalf};  
})

function getPriority(c) {
  const char = c.charAt(0);
  const charL = char.toLowerCase();
  const charU = char.toUpperCase();
  const code = char.charCodeAt(0);
  if (char === charL) {
    return (code-96);
  }
  if (char === charU){ 
    return (code-38);
  }
}

let sum = 0;
for (let i = 0; i < ruckSackContents.length; i++) {
  const contents = ruckSackContents[i];
  const first = contents.first.split('');
  const second = contents.second.split('');
  let same = '';
  for (let i = 0; i < first.length; i++) {
    const f = first[i];
    for (let ii = 0; ii < second.length; ii++) {
      const s = second[ii];
      if (f === s) same += s;
    }
  }
  
  const pri = getPriority(same);
  sum += pri;
}

// console.log(sum); // answer to part 1

/// Part 2

let elfGroups = [];
for (let i = 0; i < ruckSacks.length; i+=3) {
  const egIndex = Math.floor(i/3);
  elfGroups[egIndex] = 
  {
    one: ruckSacks[i],
    two: ruckSacks[i+1],
    three: ruckSacks[i+2]
  }
}

function findCommonChar(eg){
  for (let i = 0; i < eg.one.length; i++) {
      const ones = eg.one.charAt(i);
      if (ones === '\r') return;
      if (eg.two.includes(ones) && eg.three.includes(ones)){
        return ones;
      }
  }
}

let badgeSum = 0;
for (let i = 0; i < elfGroups.length; i++) {
  const eg = elfGroups[i];
  const badge = findCommonChar(eg);
  const pri =  getPriority(badge);
  badgeSum += pri;
}

console.log(badgeSum); // answer to part 2
