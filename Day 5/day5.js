// https://adventofcode.com/2022/day/5

const fs = require("fs");
let content = fs.readFileSync('input.txt', (err, data) => {
  if (err) throw err;
}).toString();

function createStacks(board){
  let rows = board.split('\r\n');
  rows.reverse();
  rows = rows.filter((row,i) => i !== 0); // remove number from board
  
  // initialize stacks as an array of arrays
  let stacks = [];
  for (let i = 0; i < 9; i++) {
    stacks[i] = [];
  }

  // loop through rows, find contents, and push to stacks
  rows.forEach((row, i) => {
    let rowContents = '';
    const rowAsArray = Array.from(row);
    for (let ii = 0; ii < rowAsArray.length; ii += 4) {
      const crateContent = rowAsArray[ii+1];  // collects the crate content char from the row of crates.
      rowContents += crateContent;
    }

    const rowContentsAsArray = Array.from(rowContents);
    for (let ii = 0; ii < rowContentsAsArray.length; ii++) {
      const crateContent = rowContentsAsArray[ii];
      let stack = stacks[ii];
      stack.push(crateContent);
    }
  });

  // prune away empty contents from the top
  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i];
    
    // reverse direction to be able to remove elements while looping
    for (let ii = stack.length - 1; ii >= 0; ii--) {
      const crate = stack[ii];
      // can do a clean pop because I know that empty crates are only on the top
      if (crate === ' ') stack.pop();
    }
  }

  return stacks;
}

function processMove(move, crateMoverVersion){
  const split = move.split(' ');
  const amount = split[1];
  const from = split[3];
  const to = split[5];

  switch(crateMoverVersion){
    case 9000:
      // process for answer to part one (With the CrateMover 9000)
      for (let i = 0; i < amount; i++) {
        const crate = crateStacks[from-1].pop();
        crateStacks[to-1].push(crate);
      }
      break;
    case 9001:
      // process for answer to part two (With the CrateMover 9001)
      const stackHeight = crateStacks[from-1].length;
      const crates = crateStacks[from-1].slice(stackHeight - amount, stackHeight );
      crateStacks[from-1] = crateStacks[from-1].slice(0, stackHeight - amount);
      crateStacks[to-1].push(...crates);
      break;
  }
}


const s = content.split('\r\n\r\n');
const boardText = s[0];
const moves = s[1].split('\r\n');
const crateStacks = createStacks(boardText);

for (const move of moves) {
  // processMove(move, 9000); // to get answer to part 1
  processMove(move, 9001); // to get answer to part 2
}

let answer = '';
for (const stack of crateStacks) {
  answer += stack.pop();
}
console.log(answer);