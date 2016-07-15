import request from 'superagent';
import { makeOptions } from './utils';

function hahooRequestSuperagent(url, options) {
  const opts = makeOptions(url, options);
  const { method, body, qs, headers, type } = opts;

  return new Promise((resolve, reject) => {
    const req = request(method, opts.url);
    if (headers) {
      req.set(headers);
    }
    if (qs) {
      req.query(qs);
    }
    if (body) {
      req.send(body);
    }
    if (type) {
      req.type(type);
    }
    req.end((err, response) => {
      if (err) {
        reject(new Error(err));
      }
      if (response.status < 200 || response.status >= 300) {
        reject();
      }

      let resBody = response.text;
      switch (type.toLowerCase()) {
        case 'json':
          resBody = JSON.parse(resBody);
          break;
        default:
      }

      const res = {
        headers: response.header,
        status: response.status,
        body: resBody
      };

      resolve(res);
    });
  });
}

export default hahooRequestSuperagent;
