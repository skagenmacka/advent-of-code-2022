import { readFileSync } from 'fs';
import path from 'path';

const modulo = (val: number, n: number) => {
    return ((val % n) + n) % n;
};

const simulate = (opponent: string, you: string): number => {
    const oppIndex = opponent.charCodeAt(0) - 'A'.charCodeAt(0);
    const youIndex = you.charCodeAt(0) - 'X'.charCodeAt(0) + 1; // adding 1
    
    /* Loss = 0, draw = 3, win = 6 */
    const state = modulo(youIndex - oppIndex, 3) * 3;
    
    return youIndex + state;
};

const simulate2 = (opponent: string, result: string) => {
    const oppIndex = opponent.charCodeAt(0) - 'A'.charCodeAt(0);
    const state = result.charCodeAt(0) - 'X'.charCodeAt(0);
    const youIndex = modulo(state - 1 + oppIndex, 3) + 1;
    
    return youIndex + state * 3;
};

const dir: string = path.join(__dirname, 'input.txt');
const input: string = readFileSync(dir, 'utf-8');

let totalScoreAns1 = 0;
let totalScoreAns2 = 0;

input.split('\n').forEach((line: string) => {
    const left = line[0];
    const right = line[2];
    
    totalScoreAns1 += simulate(left, right);
    totalScoreAns2 += simulate2(left, right);
});

console.log(totalScoreAns1);
console.log(totalScoreAns2);