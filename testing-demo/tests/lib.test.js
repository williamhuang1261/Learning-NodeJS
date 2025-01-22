const lib = require('../lib');
const db = require('../db');
const mail = require('../mail')

describe('absolute', () => {
  it('Should return a positive number if input is postive', () =>{
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it('Should return a positive number if input is negative', () =>{
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it('Should return 0 if input is 0', () =>{
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('Should return the greeting message', () => {
    const result = lib.greet('Mosh');
    expect(result).toMatch(/Mosh/);
    //expect(result).toContain('Mosh');
  });
});

describe('getCurrencies', () => {
  it('Should return supported currencies', () => {
    const result = lib.getCurrencies();
    
    //Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    //Proper way
    expect(result).toContain('USD');
    expect(result).toContain('EUR');
    expect(result).toContain('AUD');

    //Best
    expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
  });
});

describe('getProduct', () => {
  it('Should return the product with the given id', () => {
    const result = lib.getProduct(1);
    //expect(result).toEqual({id: 1, price: 10});
    expect(result).toMatchObject({ id: 1, price: 10});
    expect(result).toHaveProperty('id', 1);
    //expect(result).toHaveProperty('id', '1'); This fails
  });
});

describe('registerUser', () => {
  it('Should throw if username is falsy', () => {
    //Null, undefined, NaN, '', 0, false
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => {lib.registerUser(a)}).toThrow();
    });
  });
  it('Should return a user object if valid username is passed', () => {
    const result = lib.registerUser('mosh');
    expect(result).toMatchObject({username: 'mosh'});
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    //Mock function
    db.getCustomerSync = function(customerId) {
      console.log('Fake reading customer...')
      return {id: customerId, points: 20};
    }

    const order = {customerId: 1, totalPrice: 10};
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('Should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
    mail.send = jest.fn();

    lib.notifyCustomer({customerId: 1});

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});