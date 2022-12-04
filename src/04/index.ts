import { readFileSync } from 'fs';
import path from 'path';

const dir: string = path.join(__dirname, 'input.txt');
const input: string = readFileSync(dir, 'utf-8');

const parseRange = (range: string): [number, number] => {
    return range.split('-').map(item => parseInt(item)) as [number, number];
};

const fullyOverlaps = ([rangeMin1, rangeMax1]: [number, number], [rangeMin2, rangeMax2]: [number, number]): boolean => {
    return (rangeMin1 <= rangeMin2 && rangeMax1 >= rangeMax2) || (rangeMin2 <= rangeMin1 && rangeMax2 >= rangeMax1);
};

const overlaps = ([rangeMin1, rangeMax1]: [number, number], [rangeMin2, rangeMax2]: [number, number]): boolean => {
    return Math.min(rangeMax1, rangeMax2) >= Math.max(rangeMin1, rangeMin2);
};

let numFullyOverlapping = 0;
let numOverlapping = 0;

input.split('\n').forEach((line: string) => {
    const assignments = line.split(',');
    
    const range1 = parseRange(assignments[0]);
    const range2 = parseRange(assignments[1]);
    
    if (fullyOverlaps(range1, range2)) {
        numFullyOverlapping++;
    }
    
    if (overlaps(range1, range2)) {
        numOverlapping++;
    }
});

console.log(numFullyOverlapping);
console.log(numOverlapping);