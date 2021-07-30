import request from 'superagent';
import { makeOptions } from './utils';

function hahooRequestSuperagent(url, options) {
  const opts = makeOptions(url, options);
  const { method, body, qs, headers, type, credentials } = opts;

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
    if (credentials) {
      req.withCredentials();
    }
    req.end((err, response) => {
      if (err) {
        reject({ status: 0, statusText: '', errcode: -1, errmsg: `${err}` });
      }

      let res = {
        status: response.status,
        statusText: ''
      };

      let resBody = response.text;

      if (response.status < 200 || response.status >= 300) {
        let errors = {
          errcode: response.status,
          errmsg: ''
        };
        if (resBody && typeof resBody === 'object') {
          errors = { ...errors, ...resBody };
        }
        if (resBody && typeof resBody === 'string') {
          errors = { ...errors, errmsg: resBody };
        }
        res = { ...res, ...errors };
        reject(res);
      }

      switch (type.toLowerCase()) {
        case 'json':
          resBody = JSON.parse(resBody);
          break;
        default:
      }

      res = {
        headers: response.header,
        status: response.status,
        statusText: '',
        body: resBody
      };

      resolve(res);
    });
  });
}

export default hahooRequestSuperagent;
