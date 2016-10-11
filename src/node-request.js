import request from 'request';
import { makeOptions } from './utils';

function hahooRequestNodeRequest(url, options) {
  const opts = makeOptions(url, options);
  const { method, qs, body, headers, type } = opts;

  let useJson = false;
  let bodyName = 'body';

  switch (type.toLowerCase()) {
    case 'json':
      useJson = true;
      break;
    case 'form':
      bodyName = 'form';
      break;
    default:
  }

  return new Promise((resolve, reject) => {
    request({
      url: opts.url,
      method,
      qs,
      [bodyName]: body,
      headers,
      json: useJson
    },
    (err, response, resbody) => {
      if (err) {
        reject({ status: 0, statusText: '', errcode: -1, errmsg: `${err}` });
      }

      let res = {
        headers: response.headers,
        status: response.statusCode,
        statusText: '',
        body: resbody
      };

      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject();
        let errors = {
          errcode: response.statusCode,
          errmsg: ''
        };
        if (resbody && typeof resbody === 'object') {
          errors = Object.assign({}, errors, resbody);
        }
        if (resbody && typeof resbody === 'string') {
          errors = Object.assign({}, errors, { errmsg: resbody });
        }
        res = Object.assign({}, res, errors);
        reject(res);
      }

      resolve(res);
    });
  });
}

export default hahooRequestNodeRequest;
