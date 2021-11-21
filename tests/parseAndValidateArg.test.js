const { errors, getValue, checkExistFile, checkRepeatedArguments, checkOutputFilePath, checkInputFilePath, validateArgumentsConfig } = require('../validation/parseAndValidateArg');
const { test, expect } = require('@jest/globals');

describe('Error scenarios', () => {
  let consoleMock, exitMock;
  beforeEach(() => {
    consoleMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleMock.mockRestore();
    exitMock.mockRestore();
  });

  test('You cannot enter duplicate flags', () => {
    const spy = jest.spyOn(errors, 'errorRepeatedArg');
    checkRepeatedArguments(["-c", "C1-C1-R0-A", "--input", "./input.txt", "-o", "./output.txt", "-c", "A-R1"]);
    checkRepeatedArguments(["-c", "C1-C1-R0-A", "--input", "./input.txt", "-o", "./output.txt", "--input", "./input.txt"]);
    checkRepeatedArguments(["-c", "C1-C1-R0-A", "--input", "./input.txt", "-o", "./output.txt", "-o", "./output.txt"]);
    expect(spy).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
    spy.mockRestore();
  });

  test('Arguments Config is not passed', () => {
    validateArgumentsConfig(["--input", "./input.txt", "-o", "./output.txt"])
    expect(consoleMock).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
  });

  test('Config argument is invalid', () => {
    const spy = jest.spyOn(errors, 'errorConfig');
    validateArgumentsConfig(["-c", "C1-C1-R2-A0", "--input", "./input.txt", "-o", "./output.txt"]);
    expect(spy).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
    spy.mockRestore();
  });

  test('The input and / or output arguments lead to a non-existent file or directory', async () => {
    const spy = jest.spyOn(errors, 'errorMessage');
    await checkExistFile('./inputFile.txt');
    expect(spy).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(1);
    spy.mockRestore();
  });
});

describe('should check if file exist', () => {
  test('should check input file', async () => {
    const res = await checkInputFilePath(["-c", "C1-C1-R0-A", "-i", "./input.txt", "-o", "./output.txt"]);
    const res1 = await checkInputFilePath(["-c", "C1-C1-R0-A", "--input", "./input.txt", "-o", "./output.txt"]);
    expect(typeof res).toBe('object');
    expect(typeof res1).toBe('object');
  });

  test('should check output file', async () => {
    const res = await checkOutputFilePath(["-c", "C1-C1-R0-A", "-i", "./input.txt", "-o", "./output.txt"]);
    const res1 = await checkOutputFilePath(["-c", "C1-C1-R0-A", "-i", "./input.txt", "--output", "./output.txt"]);
    expect(typeof res).toBe('object');
    expect(typeof res1).toBe('object');
  });
})

describe('should get path to file if flag exist', () => {
  let filePath;

  beforeEach(() => {
    filePath1 = getValue('-i', ["-c", "C1-C1-R0-A", "-i", "./input.txt", "-o", "./output.txt"]);
    filePath2 = getValue('--input', ["-c", "C1-C1-R0-A", "--input", "./input.txt", "-o", "./output.txt"]);
    filePath3 = getValue('-o', ["-c", "C1-C1-R0-A", "-input", "./input.txt", "-o", "./output.txt"]);
    filePath4 = getValue('--output', ["-c", "C1-C1-R0-A", "--input", "./input.txt", "--output", "./output.txt"]);
  })

  test('should return string', () => {
    expect(typeof filePath1).toBe('string');
    expect(typeof filePath2).toBe('string');
    expect(typeof filePath3).toBe('string');
    expect(typeof filePath4).toBe('string');
  });

  test('should return correctly path', () => {
    expect(filePath1).toBe('./input.txt');
    expect(filePath2).toBe('./input.txt');
    expect(filePath3).toBe('./output.txt');
    expect(filePath4).toBe('./output.txt');
  });
});

describe('should return null if flag doesn`t exist', () => {
  let filePath1 = getValue('--input', ["-c", "C1-C1-R0-A", "-i", "./input.txt", "-o", "./output.txt"]);
  let filePath2 = getValue('-i', ["-c", "C1-C1-R0-A", "--input", "./input.txt", "-o", "./output.txt"]);
  let filePath3 = getValue('--output', ["-c", "C1-C1-R0-A", "-i", "./input.txt", "-o", "./output.txt"]);
  let filePath4 = getValue('-o', ["-c", "C1-C1-R0-A", "-i", "./input.txt", "--output", "./output.txt"]);

  test('should return null', () => {
    expect(filePath1).toBeNull();
    expect(filePath2).toBeNull();
    expect(filePath3).toBeNull();
    expect(filePath4).toBeNull();
  });
});

describe('should check for file existence', () => {
  test('file exist', async () => {
    let isExistInput = await checkExistFile('./input.txt');
    let isExistOutput = await checkExistFile('./output.txt');
    expect(typeof isExistInput).toBe('object');
    expect(typeof isExistOutput).toBe('object');
  });
});
