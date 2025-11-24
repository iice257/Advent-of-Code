instructions = document.getElementById('instructions').textContent.split('\n');

instruction = [];
ins = [];
toggle = ''
from = ''
to = ''

for (let o = 0; o < instructions.length; o++) {
  instruction.push(instructions[o].split(' '));
  for (let i = 0; i < instruction.length; i++) {
    ins.push(instruction[i]);
  }
  //   if (ins[0] === 'turn') {
  //     from = ins[2];
  //     to = ins[4];
  //   } else {
  //     toggle = ins[0];
  //     from = ins[1];
  //     to = ins[3];
  //   }
  //   light = 0;
  //   if (toggle === 'on') {
  //     light = 1;
  //   } else {
  //     light = 0;
  //   }
  // }
}

console.log(ins);
// console.log(ins);
console.log(from);