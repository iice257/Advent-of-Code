strings = document.getElementById('strings').textContent.split('\n');

alts = []
for (let i = 0; i < strings.length; i++) {
  string = strings[i];
  for (let o = 0; o < string.length - 2; o++) {
    if (string[o] === string[o+2]) {
      alts.push(string);
      break
    }
  }
}

pairs = []
for (let i = 0; i < alts.length; i++) {
  string = alts[i];
  for (let o = 0; o < string.length - 1; o++) {
    pair = string[o] + string[o+1]
    if (string.includes(pair, o+2)) {
      pairs.push(string);
      break
    }
  }
}

console.log(pairs.length);