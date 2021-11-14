import {
  checkRepeatedArguments,
  validateArgumentsConfig,
  checkFilePath,
} from './parseAndValidateArg.mjs';
import { caesarCipher } from './caesarCipher.mjs';
import { rotCipher } from './rotCipher.mjs';
import { atbashCipher } from './atbashCipher.mjs';
import { argv } from 'process';
import fs from 'fs';
import path from 'path';
import { pipeline, Transform } from 'stream';
import { stdin, stdout } from 'process';


const __dirname = path.resolve();
let inputFilePath = path.join(__dirname, 'input.txt');
let ouputFilePath = path.join(__dirname, 'output.txt');

function main() {
  let inputArg = argv.slice(2);
  validateArgumentsConfig(inputArg);
  checkRepeatedArguments(inputArg);
  checkFilePath(inputArg);

  let streamsArr = createStreams(inputArg);

  if (inputArg.includes('-i') || inputArg.includes('-input')) {
    let readableStream = fs.createReadStream(inputFilePath, 'utf8');
    streamsArr.unshift(readableStream);
  } else {
    console.log('\x1b[35m%s\x1b[0m', 'Hello! Enter text:');
    streamsArr.unshift(stdin);
    process.on('SIGINT', exitProcess);
  }

  if(inputArg.includes('-o') || inputArg.includes('-output')) {
    let writableStream = fs.createWriteStream(ouputFilePath, {
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
        if(inputArg.includes('-o') || inputArg.includes('-output')) {
          let writableStream = fs.createWriteStream(ouputFilePath, {
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
  inputArg.indexOf('-c') != -1 ? flagIndex = inputArg.indexOf('-c') : flagIndex = inputArg.indexOf('-config');
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
