const { encodeRot, rotCipher, decodeRot } = require('../ciphers/rotCipher');

describe('RotCipher', () => {
  let output;
  let input;

  test('should return encoded string', () => {
    input = 'Hello world! Sss';
    let cipher = 'R1';
    output = rotCipher(input, cipher);
    expect(output).toBe('Pmttw ewztl! Aaa');
  });

  test('should return decoded string', () => {
    input = 'Pmttw ewztl! Aaa';
    let cipher = 'R0';
    output = rotCipher(input, cipher);
    expect(output).toBe('Hello world! Sss');
  });
});

describe('RotCipher: encode', () => {
  let output;
  beforeEach(() => {
    output = encodeRot('Hello world');
  })

  test('should return string', () => {
    expect(typeof output).toBe('string');
  });

  test('should not be undefined', () => {
    expect(output).not.toBeUndefined();
  });

  test('should encode correctly', () => {
    expect(output).toBe('Pmttw ewztl');
  });

  test('for encoding / decoding, only the English alphabet should be used', () => {
    output = encodeRot('Hello world, привет!');
    expect(output).toBe('Pmttw ewztl, привет!');
  });
});

describe('RotCipher: decode', () => {
  let output;
  beforeEach(() => {
    output = decodeRot('Pmttw ewztl');
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
    output = decodeRot('Pmttw ewztl, привет!');
    expect(output).toBe('Hello world, привет!');
  });
});