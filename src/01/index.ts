import { readFileSync } from 'fs';
import path from 'path';

const dir: string = path.join(__dirname, 'input.txt');
const input: string = readFileSync(dir, 'utf-8');

let elves: number[] = [];

input.split('\n').forEach((line: string) => {
    const calories = parseInt(line);
    
    if (isNaN(calories)) {
        elves.push(0);
        return;
    }
    
    elves[elves.length - 1] += calories;
});

const mostCalories = Math.max(...elves);

console.log(mostCalories);

let topThree = 0;
for (let i = 0; i < 3; i++) {
    const most = Math.max(...elves);
    const index = elves.indexOf(most);
    elves.splice(index, 1);
    topThree += most;
}

console.log(topThree);