const lib = require('../exercise1');

describe('fizzBuzz', () => {
  it('Input should be a number', () => {
    const args = ['a', '', null, undefined, false];
    args.forEach(a => {
      expect(() => { lib.fizzBuzz(a)}).toThrow();
    })
  });
  it('Should return FizzBuzz if input is divisible by 3 and 5', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  it('Should return Fizz if input is only divisible by 3', () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  it('Should return Buzz if input is only divisible by 5', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  it('Should return input if it is neither divisible by 3 or 5', () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});