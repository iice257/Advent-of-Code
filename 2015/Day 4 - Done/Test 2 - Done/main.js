firstSix = ''
var number = 254575
var secretKey = "bgvyzdsv";

while (firstSix !== '000000') {
  number++
  var hash = secretKey + number
  var md5 = CryptoJS.MD5(hash).toString();
  firstSix = md5.substring(0, 6)
}