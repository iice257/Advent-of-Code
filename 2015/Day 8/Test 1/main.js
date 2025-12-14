// const input = document.getElementById('instructions').textContent.split('\n');
const input = ["", "abc", "aaa\"aaa", "\x27"]

// function parse(inputs) {
  for (let i = 0; i < input.length; i++) {
    const code = input[i].split('').length;
    const data = input[i].split('\"');
    console.log(data);
  }
// }
