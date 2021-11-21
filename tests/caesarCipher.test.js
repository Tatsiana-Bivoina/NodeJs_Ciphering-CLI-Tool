const { encodeCaesar, caesarCipher, decodeCaesar } = require('../ciphers/caesarCipher');
const { test, expect } = require('@jest/globals');

describe('CaesarCipher', () => {
  let output;
  let input;

  test('should return encoded string', () => {
    input = 'Hello world! Zzz';
    let cipher = 'C1';
    output = caesarCipher(input, cipher);
    expect(output).toBe('Ifmmp xpsme! Aaa');
  });

  test('should return decoded string', () => {
    input = 'Ifmmp xpsme! Aaa';
    let cipher = 'C0';
    output = caesarCipher(input, cipher);
    expect(output).toBe('Hello world! Zzz');
  });
});

describe('CaesarCipher: encode', () => {
  let output;
  beforeEach(() => {
    output = encodeCaesar('Hello world');
  })

  test('should return string', () => {
    expect(typeof output).toBe('string');
  });

  test('should not be undefined', () => {
    expect(output).not.toBeUndefined();
  });

  test('should encode correctly', () => {
    expect(output).toBe('Ifmmp xpsme');
  });

  test('for encoding / decoding, only the English alphabet should be used', () => {
    output = encodeCaesar('Hello world, привет!');
    expect(output).toBe('Ifmmp xpsme, привет!');
  });
});

describe('CaesarCipher: decode', () => {
  let output;
  beforeEach(() => {
    output = decodeCaesar('Ifmmp xpsme');
  })

  test('should return string', () => {
    expect(typeof output).toBe('string');
  });

  test('should not be undefined', () => {
    expect(output).not.toBeUndefined();
  });

  test('should encode correctly', () => {
    expect(output).toBe('Hello world');
  });

  test('for encoding / decoding, only the English alphabet should be used', () => {
    output = decodeCaesar('Ifmmp xpsme, привет!');
    expect(output).toBe('Hello world, привет!');
  });
});