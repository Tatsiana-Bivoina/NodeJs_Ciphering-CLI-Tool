// import { exit } from 'process';
const exit = require('process');
const fs = require('fs');
// import fs from 'fs';

function checkRepeatedArguments(inputArg) {
  if(inputArg.filter(el => el == '-c' || el == '--config').length > 1) errorRepeatedArg();
  if(inputArg.filter(el => el == '-i' || el == '--input').length > 1) errorRepeatedArg();
  if(inputArg.filter(el => el == '-o' || el == '--output').length > 1) errorRepeatedArg();
}

function checkFilePath(inputArg) {
  if(inputArg.indexOf('-i') != -1) checkExistFile(getValue('-i', inputArg));
  if(inputArg.indexOf('--input') != -1) checkExistFile(getValue('--input', inputArg));
  if(inputArg.indexOf('-o') != -1) checkExistFile(getValue('-o', inputArg));
  if(inputArg.indexOf('--output') != -1) checkExistFile(getValue('--output', inputArg));
}

function validateArgumentsConfig(inputArg) {
  if(inputArg.filter(el => el == '-c' || el == '--config').length == 0) {
    console.error('\x1b[31m%s\x1b[0m', 'Config argument is missing');
    exit(1);
  }
  const regexp = /^((C[0,1])+[-]?|(R[0,1])+[-]?|(A)+[-]?)+$/g;
  let flag = '';
  inputArg.indexOf('-c') != -1 ? flag = inputArg.indexOf('-c') : flag = inputArg.indexOf('--config');
  if(!regexp.test(getValue(inputArg[flag], inputArg))) errorConfig();
}

function getValue(flag, inputArg) {
  const flagIndex = inputArg.indexOf(flag);
  return flagIndex !== -1 ? inputArg[flagIndex + 1].trim() : null;
}

function checkExistFile(fileName) {
  fs.stat(fileName, function(err, stat) {
    if(!err) return;
    if(err.code == 'ENOENT') {
      errorMessage();
    }
  });
}

function errorMessage() {
  console.error('\x1b[31m%s\x1b[0m', 'The input and / or output arguments lead to a non-existent file or directory!');
  process.exit(1);
}

function errorConfig() {
  console.error('\x1b[31m%s\x1b[0m', 'Config argument is invalid or missing!');
  process.exit(1);
}

function errorRepeatedArg() {
  console.error('\x1b[31m%s\x1b[0m', 'You cannot enter duplicate flags!');
  exit(1);
}

module.exports = {
  checkRepeatedArguments,
  checkFilePath,
  validateArgumentsConfig
}
