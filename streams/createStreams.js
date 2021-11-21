const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const { stdin, stdout } = require('process');
const { caesarCipher } = require('../ciphers/caesarCipher.js');
const { rotCipher } = require('../ciphers/rotCipher.js');
const { atbashCipher } = require('../ciphers/atbashCipher.js');

let inputFilePath = '';
let fileName= '';

function createStreams(inputArg) {
  let flagIndex = null;
  inputArg.indexOf('-c') != -1 ? flagIndex = inputArg.indexOf('-c') : flagIndex = inputArg.indexOf('--config');
  const arrCiphers = inputArg[flagIndex + 1].trim().split('-');
  return arrCiphers.map((el) => {
    if (el == 'C1' || el == 'C0') {
      return new Transform({
        transform(chunk, enc, cb) {
          cb(null, caesarCipher(chunk.toString(), el));
        }
      });
    }
    if (el == 'R1' || el == 'R0') {
      return new Transform({
        transform(chunk, enc, cb) {
          cb(null, rotCipher(chunk.toString(), el));
        }
      });
    }
    if (el == 'A') {
      return new Transform({
        transform(chunk, enc, cb) {
          cb(null, atbashCipher(chunk.toString()));
        }
      });
    };
  });
}

function createReadStream(inputArg, __dirname) {
  if (inputArg.includes('-i') || inputArg.includes('--input')) {
    if(inputArg.includes('-i')) {
      fileName = inputArg[inputArg.indexOf('-i') + 1].trim();
    } else {
      fileName = inputArg[inputArg.indexOf('--input') + 1].trim();
    }
    inputFilePath = path.join(__dirname, fileName).toString();
    return fs.createReadStream(inputFilePath, 'utf8');
  } else {
    console.log('\x1b[35m%s\x1b[0m', 'Hello! Enter text:');
    process.on('SIGINT', exitProcess);
    return stdin;
  }
}

function createWriteStream(inputArg, __dirname, outputFilePath) {
  let obj = {outputFilePath: null, writeStream: null };
  if(inputArg.includes('-o') || inputArg.includes('--output')) {
    if(inputArg.includes('-o')) {
      fileName = inputArg[inputArg.indexOf('-o') + 1].trim();
    } else {
      fileName = inputArg[inputArg.indexOf('--output') + 1].trim();
    }
    
    obj.outputFilePath = path.join(__dirname, fileName);
    obj.writeStream = fs.createWriteStream(obj.outputFilePath, {
      flags: 'a',
      encoding: 'utf8',
    });
    return obj;
  } else {
    obj.writeStream = stdout;
    return obj;
  }
}

function exitProcess() {
  console.log('\x1b[35m%s\x1b[0m', 'Thanks! Great job!');
  process.exit(0);
}

module.exports = {
  createStreams,
  createReadStream,
  createWriteStream, 
  exitProcess
}

 

