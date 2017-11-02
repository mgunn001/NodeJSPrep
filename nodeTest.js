// to run : node nod_4gramSimhash.js 4genderjustice20150701215641.txt

var simhash = require('simhash')('md5');
var nGram = require('n-gram');
// Read the file and print its contents.
var fs = require('fs');

function main () {

  var strToBeSimhashed = "Hello, How are you ?";

  var filename = process.argv[2];
  if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }

  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    console.log(data)
    strToBeSimhashed = data;
  });

  console.log("Text under test:"+ strToBeSimhashed );
  var nGram4Arr = nGram(4)(strToBeSimhashed);
  console.log("4-Gram converted Array:"+nGram4Arr);
  var binary4GramSimhash = simhash(nGram4Arr).join('');
  console.log('BinaryFormated 4-Gram Simhash:'+ binary4GramSimhash);
  var retStr = getHexString(binary4GramSimhash);         
  console.log("4-Gram Simhash Hex String:"+ retStr);
  console.log("Default word based simhash which is currently used in Archive Thumbnails:"+  getHexString(simhash(strToBeSimhashed.split('')).join('')));
}


function getHexString (onesAndZeros) {
  var str = ''
  for (var i = 0; i < onesAndZeros.length; i = i + 4) {
    str += Bin2Hex(onesAndZeros.substr(i, 4))
  }

  return str
}

function Bin2Hex (n) {
  if (!checkBin(n)) {
    return 0
  }

  return parseInt(n, 2).toString(16)
}

// Useful Functions
function checkBin (n) {
//  return /^[01]{1, 64}$/.test(n)
// ByMahee -- the above statement is being changed to the following as we are checking 4 bits at a time
 //console.log("Inside Check Binary")
 return /^[01]{1,4}$/.test(n)
}


exports.main = main
main()



/*output:

Text under test:Hello, How are you ?
4-Gram converted Array:Hell,ello,llo,,lo, ,o, H,, Ho, How,How ,ow a,w ar, are,are ,re y,e yo, you,you ,ou ?
BinaryFormated 4-Gram Simhash:01011001111010001110010011001101110111010000100011001011010001001101010100011111111011110010110010000100010110010111000101001011
4-Gram Simhash Hex String:59e8e4cddd08cb44d51fef2c8459714b
Default word based simhash which is currently used in Archive Thumbnails:3a169817621900c7dd4029a379feaa82*/