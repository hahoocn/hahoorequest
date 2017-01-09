import { expect } from 'chai';
import { makeOptions, addQs } from '../src/utils';

describe('utils', () => {
  describe('makeOptions', () => {
    const result = {
      url: 'http://www.abc.com/',
      method: 'POST',
      qs: {
        qs1: 'test1',
        qs2: 'test2'
      },
      body: {
        foo: 'bar'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      type: 'json',
      crossOrigin: true,
      credentials: undefined
    };
    it('should return the right options object as expected by url and options', () => {
      expect(makeOptions('http://www.abc.com/', {
        method: 'POST',
        qs: {
          qs1: 'test1',
          qs2: 'test2'
        },
        body: {
          foo: 'bar'
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })).to.eql(result);
    });
    it('should return the right options object as expected by options', () => {
      expect(makeOptions({
        url: 'http://www.abc.com/',
        method: 'POST',
        qs: {
          qs1: 'test1',
          qs2: 'test2'
        },
        body: {
          foo: 'bar'
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })).to.eql(result);
    });
  });
  describe('addQs', () => {
    it('should return the right url when url arg is not have "?"', () => {
      const result = 'http://www.abc.com/test?qs1=test1&qs2=test2';
      expect(addQs('http://www.abc.com/test', { qs1: 'test1', qs2: 'test2' })).to.eql(result);
    });
    it('should return the right url when url arg is have QueryString', () => {
      const result = 'http://www.abc.com/test?qs1=test1&qs2=test2&qs3=test3';
      expect(addQs('http://www.abc.com/test?qs1=test1', { qs2: 'test2', qs3: 'test3' })).to.eql(result);
    });
    it('should return the right url when url arg is have "?" and not have QueryString', () => {
      const result = 'http://www.abc.com/test?qs1=test1&qs2=test2&qs3=test3';
      expect(addQs('http://www.abc.com/test?', { qs1: 'test1', qs2: 'test2', qs3: 'test3' })).to.eql(result);
    });
  });
});
