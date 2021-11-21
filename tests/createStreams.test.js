const { test, expect } = require('@jest/globals');
const { stdin, stdout } = require('process');
const { createStreams, createReadStream, createWriteStream, exitProcess } = require('../streams/createStreams');

describe('Create transform streams', () => {
  test('should return array', () => {
    let res = createStreams(["-c", "C1-C1-R0-A", "--input", "./input.txt", "-o", "./output.txt"]);
    expect(Array.isArray(res)).toBe(true);
  });
})

describe('Create readable streams', () => {
  test('should return readable stream', () => {
    let res = createReadStream(["-c", "C1-C1-R2-A0", "--input", "./input.txt", "-o", "./output.txt"], `D:\\work\\RollingScopes_NodeJs\\RollingScopesNode_ciphering-cli-tool`);
    expect(typeof res).toBe('object');
  });
  test('should return stdin', () => {
    let res = createReadStream(["-c", "C1-C1-R2-A0", "-o", "./output.txt"], `D:\\work\\RollingScopes_NodeJs\\RollingScopesNode_ciphering-cli-tool`);
    expect(typeof res).toBe('object');
  })
});

describe('Create writable streams', () => {
  test('should return writable stream', () => {
    let res = createWriteStream(["-c", "C1-C1-R2-A0", "--input", "./input.txt", "-o", "./output.txt"], `D:\\work\\RollingScopes_NodeJs\\RollingScopesNode_ciphering-cli-tool`, '');
    expect(typeof res).toBe('object');
  });
  test('should return stdout', () => {
    let res = createWriteStream(["-c", "C1-C1-R2-A0", "--input", "./input.txt"], `D:\\work\\RollingScopes_NodeJs\\RollingScopesNode_ciphering-cli-tool`, '');
    expect(typeof res).toBe('object');
  })
});

describe('exit process', () => {
  test('should call console and process.exit', () => {
    let consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    let exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});
    exitProcess();
    expect(consoleMock).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(0);

    consoleMock.mockRestore();
    exitMock.mockRestore();
  });
});

