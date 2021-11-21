const { test, expect } = require('@jest/globals');
const { atbashCipher } = require('../ciphers/atbashCipher.js');

describe('AtbashCipher', () => {
  let output;
  beforeEach(() => {
    output = atbashCipher('Hello world');
  })

  test('should return string', () => {
    expect(typeof output).toBe('string');
  });

  test('should not be undefined', () => {
    expect(output).not.toBeUndefined();
  });

  test('should encode correctly', () => {
    expect(output).toBe('Svool dliow');
  });
})

