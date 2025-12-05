instructions = document.getElementById('instructions').textContent.split('\n');
const inst = (inst) => inst.split(' ')
instruction = instructions.map(inst);

// console.log(instruction);

// for (let i = 0; i < instruction.length; i++) {
//   x = 0
//   y = 0
//   z = 0
//   if (instruction[i][0] !== 'turn') {
//     x++
//   // } else if (instruction[i][0] === 'turn' && instruction[i][1] === 'off') {
//   //   y++
//   }
//   else z++
// }

// console.log(x);
// console.log(y);
// console.log(z);

console.log(instruction[0])
console.log(instruction[0][0] === 'turn' && instruction[0][1] === 'on')