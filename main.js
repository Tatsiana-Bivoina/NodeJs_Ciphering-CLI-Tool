const fs = require('fs');
const { argv } = require('process');
const { pipeline } = require('stream');
const { checkRepeatedArguments, validateArgumentsConfig, checkInputFilePath, checkOutputFilePath } = require('./validation/parseAndValidateArg.js');
const { createStreams, createReadStream, createWriteStream } = require('./streams/createStreams');


let outputFilePath = '';

function main() {
  let inputArg = argv.slice(2);
  validateArgumentsConfig(inputArg);  
  checkRepeatedArguments(inputArg);
  checkInputFilePath(inputArg);
  checkOutputFilePath(inputArg);

  let streamsArr = createStreams(inputArg);
  streamsArr.unshift(createReadStream(inputArg, __dirname));

  let writeStream = createWriteStream(inputArg, __dirname, outputFilePath);
  outputFilePath = writeStream.outputFilePath;
  streamsArr.push(writeStream.writeStream);

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
}
main();


