// C.js
import { B } from './2.js';
const b = new B();

console.log(b.m()) // 1
// console.log(b[key]) // key is not defined
const syms = Object.getOwnPropertySymbols(b);
console.log(syms[0]) // Symbol(key)
console.log(b[syms[0]]) // 1