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
        reject(new Error(err));
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject();
      }

      const res = {
        headers: response.headers,
        status: response.statusCode,
        body: resbody
      };

      resolve(res);
    });
  });
}

export default hahooRequestNodeRequest;
