const exit = require('process');
const fs = require('fs/promises');

function checkRepeatedArguments(inputArg) {
  if(inputArg.filter(el => el == '-c' || el == '--config').length > 1) errors.errorRepeatedArg();
  if(inputArg.filter(el => el == '-i' || el == '--input').length > 1) errors.errorRepeatedArg();
  if(inputArg.filter(el => el == '-o' || el == '--output').length > 1) errors.errorRepeatedArg();
}

async function checkInputFilePath(inputArg) {
  if(inputArg.indexOf('-i') != -1) return await checkExistFile(getValue('-i', inputArg));
  if(inputArg.indexOf('--input') != -1) return await checkExistFile(getValue('--input', inputArg));
}

async function checkOutputFilePath(inputArg) {
  if(inputArg.indexOf('-o') != -1) return await checkExistFile(getValue('-o', inputArg));
  if(inputArg.indexOf('--output') != -1) return await checkExistFile(getValue('--output', inputArg));
}

function validateArgumentsConfig(inputArg) {
  if(inputArg.filter(el => el == '-c' || el == '--config').length == 0) {
    console.error('\x1b[31m%s\x1b[0m', 'Config argument is missing');
    process.exit(1);
  }
  const regexp = /^((C[0,1])+[-]?|(R[0,1])+[-]?|(A)+[-]?)+$/g;
  let flag = '';
  inputArg.indexOf('-c') != -1 ? flag = inputArg.indexOf('-c') : flag = inputArg.indexOf('--config');
  if(!regexp.test(getValue(inputArg[flag], inputArg))) errors.errorConfig();
}

function getValue(flag, inputArg) {
  const flagIndex = inputArg.indexOf(flag);
  return flagIndex !== -1 ? inputArg[flagIndex + 1].trim() : null;
}

async function checkExistFile(fileName) {
  try {
    let res = await fs.stat(fileName);
    return res;
  }
  catch(e) {
    if(e.code == 'ENOENT') {
      errors.errorMessage();
    }
  }
}

const errors = {
  errorMessage() {
    console.error('\x1b[31m%s\x1b[0m', 'The input and / or output arguments lead to a non-existent file or directory!');
    process.exit(1);
  },
  errorConfig() {
    console.error('\x1b[31m%s\x1b[0m', 'Config argument is invalid or missing!');
    process.exit(1);
  },
  errorRepeatedArg() {
    console.error('\x1b[31m%s\x1b[0m', 'You cannot enter duplicate flags!');
    process.exit(1);
  }
};

module.exports = {
  errors,
  getValue,
  checkExistFile,
  checkRepeatedArguments,
  checkInputFilePath,
  checkOutputFilePath,
  validateArgumentsConfig
}
