import reqwest from 'reqwest';
import { makeOptions, addQs } from './utils';

function hahooRequestReqwest(url, options) {
  const opts = makeOptions(url, options);
  const { method, body, qs, headers, type, credentials } = opts;
  let { crossOrigin } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  let withCredentials = false;
  if (credentials) {
    withCredentials = true;
    crossOrigin = true;
  }

  return new Promise((resolve, reject) => {
    const req = reqwest({
      url: requestUrl,
      method,
      data: body,
      headers,
      type,
      crossOrigin,
      withCredentials
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
    .catch(err => reject({ status: 0, statusText: '', errcode: -1, errmsg: `${err}` }));
  });
}

export default hahooRequestReqwest;
