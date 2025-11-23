const dimensions = document.getElementById('dimensions').textContent.split('\n');

let ribbonArray = [];
for (let i = 0; i < dimensions.length; i++) {
  const values = dimensions[i].split('x');
  const l = parseInt(values[0]);
  const w = parseInt(values[1]);
  const h = parseInt(values[2]);

  smallestSides = [l, w, h].sort((a, b) => (a - b));
  a = smallestSides[0];
  b = smallestSides[1];

  const ribbonWrap = 2 * (a+b);
  const ribbonBow = (l*w*h);
  const totalRibbon = ribbonWrap + ribbonBow;
  
  ribbonArray.push(totalRibbon);
};
const totalRibbonArray = ribbonArray.reduce((sum, dimension) => { return sum + dimension }, 0);