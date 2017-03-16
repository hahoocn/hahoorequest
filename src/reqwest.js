import reqwest from 'reqwest';
import { makeOptions, addQs } from './utils';

function hahooRequestReqwest(url, options) {
  const opts = makeOptions(url, options);
  const { method, body, qs, headers, type, credentials, contentType } = opts;
  let { crossOrigin } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  let withCredentials = false;
  if (credentials) {
    withCredentials = true;
    crossOrigin = true;
  }
  let data;
  if (body && contentType === 'application/json') {
    data = JSON.stringify(body);
  } else {
    data = body;
  }

  return new Promise((resolve, reject) => {
    const req = reqwest({
      url: requestUrl,
      method,
      data,
      headers,
      type,
      crossOrigin,
      withCredentials,
      contentType
    })
    .then((response) => {
      let res = {
        status: req.request.status,
        statusText: '',
        body: response
      };

      if (req.request.status < 200 || req.request.status >= 300) {
        let errors = {
          errcode: req.request.status,
          errmsg: ''
        };
        if (response && typeof response === 'object') {
          errors = Object.assign({}, errors, response);
        }
        if (response && typeof response === 'string') {
          errors = Object.assign({}, errors, { errmsg: response });
        }
        res = Object.assign({}, res, errors);
        reject(res);
      } else {
        resolve(res);
      }
    })
    .catch((err) => {
      if (typeof err === 'object') {
        let errcode = err.status || -1;
        let errmsg = err.statusText || '';
        if (err.response) {
          const response = JSON.parse(err.response);
          if (typeof response === 'object') {
            if (response.errcode) errcode = response.errcode;
            if (response.errmsg) errmsg = response.errmsg;
          } else {
            errmsg = response;
          }
        }
        const res = {
          status: err.status || 0,
          statusText: err.statusText || '',
          errcode,
          errmsg
        };
        reject(res);
      } else {
        reject({ status: 0, statusText: '', errcode: -1, errmsg: err });
      }
    });
  });
}

export default hahooRequestReqwest;
