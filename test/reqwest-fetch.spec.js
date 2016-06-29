import { expect } from 'chai';
import request from '../src/reqwest-fetch';

/* eslint func-names: 0 */
/* eslint prefer-arrow-callback: 0*/
describe('reqwest-fetch', function () {
  it('should accept json response', function () {
    this.timeout(10000);
    const test = request({ url: 'https://raw.githubusercontent.com/hahoocn/hahoorequest/master/test/test.json' })
    .then(function (res) {
      expect(res.body).to.eql({ foo: 'bar' });
    });
    return test;
  });
});
