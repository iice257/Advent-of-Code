let brackets = document.getElementById('brackets').textContent;
let bracketsArray = Array.from(brackets)
const up = bracketsArray.filter(bracket => (bracket === '(')).length;
const down = bracketsArray.filter(bracket => (bracket === ')')).length;
let finalPosition = up-down
console.log(finalPosition);