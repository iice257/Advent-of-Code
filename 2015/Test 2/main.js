let brackets = document.getElementById('brackets').textContent;

let floor = 0;
let basementPosition = -1;

for (let i = 0; i < brackets.length; i++) {
       if (brackets[i] === '(') {floor++;} 
  else if (brackets[i] === ')') {floor--;}

  if (floor === -1) {
    basementPosition = i + 1;
    break;
  }
}
console.log(basementPosition);