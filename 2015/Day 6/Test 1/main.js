instructions = document.getElementById('instructions').textContent.split('\n');
instruction = '';
for (let i = 0; i < instructions.length; i++) {
  instruction = instructions[i].split(' ');
  toggle = instruction[0];
  from = instruction[1].split(',');
  to = instruction[3].split(',');
  light = 0;
  if (toggle === 'on') {
    light = 1;
  }

}
console.log([instructions[1].split(' ')]);