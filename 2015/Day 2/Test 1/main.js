const dimensions = document.getElementById('dimensions').textContent;
const cleaned = dimensions.replaceAll('\n', '.').replaceAll('x', ',');
const cleanedArray = Array.from(cleaned);
const array = cleanedArray.map(Number);
console.log(array);

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  
}

// console.log(cleaned);
// console.log(cleanedArray);