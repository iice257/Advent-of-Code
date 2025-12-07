const instructions = document.getElementById('instructions').textContent.split('\n').map((splits) => splits.split(' '));;
let grid = Array(1000).fill(0).map(() => Array(1000).fill(0));

function getInstuctions(instruction) {
  let state, x1_string, y1_string, x2_string, y2_string;

  if (instruction[0] === 'toggle') {
    state = 'toggle';
    [x1_string, y1_string] = instruction[1].split(',');
    [x2_string, y2_string] = instruction[3].split(',');
  } else {
    state = instruction[1] === 'on' ? 'on' : 'off';
    [x1_string, y1_string] = instruction[2].split(',');
    [x2_string, y2_string] = instruction[4].split(',');
  };

  return { 
    state: state, 
    x1: parseInt(x1_string), 
    y1: parseInt(y1_string), 
    x2: parseInt(x2_string), 
    y2: parseInt(y2_string)
  };
};

for (let i = 0; i < instructions.length; i++) {
  const { state, x1, y1, x2, y2 } = getInstuctions(instructions[i]);
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      if (state === 'on') {
        grid[x][y] += 1;
      } else if (state === 'off') {
        grid[x][y] = Math.max(0, grid[x][y] - 1);
      } else if (state === 'toggle') {
        grid[x][y] += 2;
      }
    };
  };
};

let totalBrightness = 0;
for (let x = 0; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    if (grid[x][y] > 0) {
      totalBrightness += grid[x][y];
    }
  }
};

console.log(totalBrightness);