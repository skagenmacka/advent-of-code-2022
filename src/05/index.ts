import { readFileSync } from 'fs';
import path from 'path';

const dir: string = path.join(__dirname, 'input.txt');
const input: string = readFileSync(dir, 'utf-8');

const [crates, instructions] = input.split(/\r?\n\r?\n/);

// parsing stacks
/*
[
    [ Z, N ],
    [ M, C, D ],
    [ P ]
]
*/
let stacks: string[][] = [];

const crateLines = crates.split('\n');

for (let i = crateLines.length - 2; i >= 0; i--) {
    const line = crateLines[i];

    for (let j = 0; j < line.length; j += 4) {
        const crate = line[j + 1];
        const crateIndex = j / 4;
        
        if (crate !== ' ') {
            if (!stacks[crateIndex]) {
                stacks[crateIndex] = [];
            }
            
            stacks[crateIndex].push(crate);
        }
    }
}

let stacks2 = stacks.map(x => x.map(y => y));

//instructions
instructions.split('\n').forEach((line: string) => {
    const matches = line.match(/\d+/g);
    const [numToMove, fromIndex, toIndex] = matches?.map(item => parseInt(item)) as [number, number, number];
    
    // for answer 1
    for (let i = 0; i < numToMove; i++) {
        let temp = stacks[fromIndex - 1].pop() as string;
        stacks[toIndex - 1].push(temp);
    }
    
    // for answer 2
    const temp = stacks2[fromIndex - 1].slice(-numToMove);
    for (let i = 0; i < numToMove; i++) { stacks2[fromIndex - 1].pop(); }
    
    stacks2[toIndex - 1].push(...temp);
});

let msg = '', msg2 = '';
stacks.forEach((stack: string[], i) => {
    msg += stack[stack.length - 1];
    
    const stack2 = stacks2[i];
    msg2 += stack2[stack2.length - 1];
});

console.log(msg);
console.log(msg2);