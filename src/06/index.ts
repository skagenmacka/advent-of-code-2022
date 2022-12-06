import { readFileSync } from 'fs';
import path from 'path';

const dir: string = path.join(__dirname, 'input.txt');
const stream: string = readFileSync(dir, 'utf-8');

const unique = (val: string): boolean => {
    const set = new Set(val.split(''));
    return val.length === set.size; 
};

let startOfPacket = 0;

for (let i = 0; i < stream.length - 3; i += 1) {
    const chunk = stream.slice(i, i + 4);
    
    if (unique(chunk)) {
        // marker
        startOfPacket = i + 4;
        break;
    }
}

let startOfMessage = 0;

for (let i = 0; i < stream.length - 13; i += 1) {
    const chunk = stream.slice(i, i + 14);
    
    if (unique(chunk)) {
        // marker
        startOfMessage = i + 14;
        break;
    }
}

console.log(startOfPacket);
console.log(startOfMessage);