import { compose, pipe } from "lodash/fp.js";

let input = "   JavaScript  ";
let output = "<div>" + input.trim() + "</div>";

const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}</div>`;
const wrap = type => str => `<${type}>${str}</${type}>`; // currying
const toLowerCase = str => str.toLowerCase();

// const result = wrapInDiv(toLowerCase(trim(input)));

// const transform = compose(wrapInDiv, toLowerCase, trim);

const transform = pipe(trim, toLowerCase, wrap("div"));

console.log(transform(input));
