let brackets = document.getElementById('brackets').textContent;

let position = 0;

for (let i = 0; i < brackets.length; i++) {
       if (brackets[i] == '(') {position++;}
  else if (brackets[i] == ')') {position--;}
  
  if (position === -1) {
    console.log(i+1);
    break;
  }
};