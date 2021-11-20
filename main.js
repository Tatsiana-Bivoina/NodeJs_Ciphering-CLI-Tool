// import fs from 'fs';
const fs = require('fs');
// import path from 'path';
const path = require('path');
// import { argv } from 'process';
const { argv } = require('process');
// import { pipeline, Transform } from 'stream';
const { pipeline, Transform } = require('stream');
// import { stdin, stdout } from 'process';
const { stdin, stdout } = require('process');
// import {
//   checkRepeatedArguments,
//   validateArgumentsConfig,
//   checkFilePath,
// } from './validation/parseAndValidateArg.js';
const { checkRepeatedArguments, validateArgumentsConfig, checkFilePath } = require('./validation/parseAndValidateArg.js');
// import { caesarCipher } from './ciphers/caesarCipher.js';
const { caesarCipher } = require('./ciphers/caesarCipher.js');
// import { rotCipher } from './ciphers/rotCipher.js';
const { rotCipher } = require('./ciphers/rotCipher.js');
// import { atbashCipher } from './ciphers/atbashCipher.js';
const { atbashCipher } = require('./ciphers/atbashCipher.js');

// const __dirname = path.resolve();
let inputFilePath = '';
let fileName= '';
let outputFilePath = '';

function main() {
  let inputArg = argv.slice(2);
  validateArgumentsConfig(inputArg);
  checkRepeatedArguments(inputArg);
  checkFilePath(inputArg);

  let streamsArr = createStreams(inputArg);

  if (inputArg.includes('-i') || inputArg.includes('--input')) {
    if(inputArg.includes('-i')) {
      fileName = inputArg[inputArg.indexOf('-i') + 1].trim();
    } else {
      fileName = inputArg[inputArg.indexOf('--input') + 1].trim();
    }

    inputFilePath = path.join(__dirname, fileName);

    let readableStream = fs.createReadStream(inputFilePath, 'utf8');
    streamsArr.unshift(readableStream);
  } else {
    console.log('\x1b[35m%s\x1b[0m', 'Hello! Enter text:');
    streamsArr.unshift(stdin);
    process.on('SIGINT', exitProcess);
  }

  if(inputArg.includes('-o') || inputArg.includes('--output')) {
    if(inputArg.includes('-o')) {
      fileName = inputArg[inputArg.indexOf('-o') + 1].trim();
    } else {
      fileName = inputArg[inputArg.indexOf('--output') + 1].trim();
    }

    outputFilePath = path.join(__dirname, fileName);

    let writableStream = fs.createWriteStream(outputFilePath, {
      flags: 'a',
      encoding: 'utf8',
    });
    streamsArr.push(writableStream);
  } else {
    streamsArr.push(stdout);
  }

  pipeline(
    streamsArr,
    (error) => {
      if(error) {
        console.error('\x1b[31m%s\x1b[0m', 'Something went wrong')
      } else {
        console.log('\x1b[32m%s\x1b[0m', 'Recording was successful');
        if(inputArg.includes('-o') || inputArg.includes('--output')) {
          let writableStream = fs.createWriteStream(outputFilePath, {
            flags: 'a',
            encoding: 'utf8',
          });
          writableStream.end('\n');
        }
      }
    }
  )
  function exitProcess() {
    console.log('\x1b[35m%s\x1b[0m', 'Thanks! Great job!');
    process.exit();
  }
}
main();

function createStreams(inputArg) {
  let flagIndex = null;
  inputArg.indexOf('-c') != -1 ? flagIndex = inputArg.indexOf('-c') : flagIndex = inputArg.indexOf('--config');
  const arrCiphers = inputArg[flagIndex + 1].trim().split('-');
  return arrCiphers.map((el) => {
    if (el == 'C1' || el == 'C0') {
      return new Transform({
        transform(chunk, enc, cb) {
          console.log(caesarCipher(chunk.toString(), el))
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
