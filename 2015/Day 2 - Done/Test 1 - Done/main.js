const dimensions = document.getElementById('dimensions').textContent.split('\n');

  let totalAreaArray = [];
  for (let i = 0; i < dimensions.length; i++) {
    const values = dimensions[i].split('x');
    const l = parseInt(values[0]);
    const w = parseInt(values[1]);
    const h = parseInt(values[2]);

    const surfaceArea = 2 * ((l*w) + (l*h) + (w*h));
    const smallSide = [(l*w), (l*h), (w*h)].sort((a, b) => (a - b))[0];
    const totalArea = surfaceArea + smallSide;
    
    totalAreaArray.push(totalArea);
  };

const finalTotal = totalAreaArray.reduce((sum, dimension) => { return sum + dimension }, 0);