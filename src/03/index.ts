import { readFileSync } from 'fs';
import path from 'path';

const dir: string = path.join(__dirname, 'input.txt');
const input: string = readFileSync(dir, 'utf-8');

const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const ACode = 'A'.charCodeAt(0);

const getPriority = (charCode: number): number => {
    if (charCode >= aCode && charCode <= zCode) {
        /* a to z */
        return charCode - aCode + 1;
    }
    
    /* A to Z */
    return charCode - ACode + 27;
};

const getGroupBadge = (group: string[]): number => {
    let longestStr = group.reduce((a, b) => a.length > b.length ? a : b);
    
    // whack
    for (let i = 0; i < longestStr.length; i++) {
        let char = longestStr[i];
        let match = true;
        
        for (let j = 0; j < group.length; j++) {
            match &&= group[j].includes(char);
        }
        
        if (match) {
            return getPriority(char.charCodeAt(0));
        }
    }
    
    return 0;
};

let sumAns1 = 0, sumAns2 = 0;

let tempElfGroup: string[] = [];

input.split('\n').forEach((line: string, index: number) => {
    const first = line.substring(0, line.length >> 1);
    const second = line.substring(line.length >> 1);
    
    let collisions: string[] = [];
    
    for (let i = 0; i < first.length; i++) {
        const char = first[i];
        if (second.includes(char) && !collisions.includes(char)) {
            collisions.push(char);
        }
    }
    
    collisions.forEach(char => {
        const priority = getPriority(char.charCodeAt(0));
        sumAns1 += priority;
    });

    
    
    tempElfGroup.push(line);
    
    if (tempElfGroup.length === 3) {
        const groupBadge = getGroupBadge(tempElfGroup);
        sumAns2 += groupBadge;
        
        tempElfGroup.length = 0;
    }
});

console.log(sumAns1);
console.log(sumAns2);