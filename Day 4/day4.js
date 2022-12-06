// https://adventofcode.com/2022/day/4

const fs = require("fs");
let content = fs.readFileSync('input.txt', (err, data) => {
  if (err) throw err;
}).toString();

const assignmentPairs = content.split('\n');
let aContainedInB = 0;
let aOverlapsB = 0;
assignmentPairs.map(ap => {
    const split = ap.split(',');
    const p1 = split[0];
    const p2 = split[1];
    const range1 = p1.split('-');
    const range2 = p2.split('-');
    const l1 = Number(range1[0]);
    const l2 = Number(range2[0]);
    const h1 = Number(range1[1]);
    const h2 = Number(range2[1]);
    if (l1 >= l2 && h1 <= h2 || l1 <= l2 && h1 >= h2) aContainedInB++;
    if (l1 <= l2 && h1 >= l2 || l1 >= l2 && l1 <= h2) aOverlapsB++;
})
console.log(aContainedInB); // answer to part one
console.log(aOverlapsB); // answer to part two