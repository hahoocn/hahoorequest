import reqwest from 'reqwest';
import { makeOptions, addQs } from './utils';

function hahooRequestReqwest(url, options) {
  const opts = makeOptions(url, options);
  const { method, body, qs, headers, type, credentials } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  let withCredentials = false;
  let crossOrigin = false;
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
      if (req.request.status < 200 || req.request.status >= 300) {
        reject();
      }
      const res = {
        status: req.request.status,
        body: response
      };
      resolve(res);
    })
    .catch(err => reject(err));
  });
}

export default hahooRequestReqwest;
