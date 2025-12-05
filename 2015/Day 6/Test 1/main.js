const instructions = document.getElementById('instructions').textContent.split('\n');
const inst = (inst) => inst.split(' ');
const instruction = instructions.map(inst);

// x1 = 0, x2 = 0;
x = 0, y = 0, z = 0;
// y1 = 0, y2 = 0;

for (let i = 0; i < instruction.length; i++) {
  if (instruction[i][0] === 'turn' && instruction[i][1] === 'on') {
    x++
  } else if (instruction[i][0] === 'turn' && instruction[i][1] === 'off') {
    y++
  }
  else z++
}

// let xpos, ypos, x1, y1, x2, y2;
let xpos = [], ypos = [], x1 = [], y1 = [], x2 = [], y2 = [];

for (let i = 0; i < 1/* instruction.length */; i++) {
  if (instruction[i].length !== 5) {
    xpos = instruction[i][2]
    ypos = instruction[i][4]
    x1 = xpos.split(',')[0]
    y1 = ypos.split(',')[0]
    x2 = xpos.split(',')[1]
    y2 = ypos.split(',')[1]
  } else {
    xpos = instruction[i][1]
    ypos = instruction[i][3]
    x1 = xpos.split(',')[0]
    y1 = ypos.split(',')[0]
    x2 = xpos.split(',')[1]
    y2 = ypos.split(',')[1]
  }
  console.log(xpos);
  console.log(ypos);
  console.log(x1);
  console.log(y1);
  console.log(x2);
  console.log(y2);
  // xpos.push(xpos);
  // ypos.push(ypos);
  // x1.push(x1);
  // y1.push(y1);
  // x2.push(x2);
  // y2.push(y2);
}

console.log(instruction[0].length);