let brackets = document.getElementById('brackets').textContent;
let bracketsArray = Array.from(brackets)
const up = bracketsArray.filter(brackets => (brackets === '(')).length;
const down = bracketsArray.filter(brackets => (brackets === ')')).length;
let finalPosition = up-down
console.log(finalPosition);