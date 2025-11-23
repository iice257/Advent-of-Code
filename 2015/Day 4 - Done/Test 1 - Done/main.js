firstFive = ''
var number = 0
var secretKey = "bgvyzdsv";

while (firstFive !== '00000') {
  number++
  var hash = secretKey + number
  var md5 = CryptoJS.MD5(hash).toString();
  firstFive = md5.substring(0, 5)
}