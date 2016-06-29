import reqwest from 'reqwest';
import { makeOptions, addQs } from './utils';

function hahooRequestReqwest(url, options) {
  const opts = makeOptions(url, options);
  const { method, body, qs, headers, type, crossOrigin } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  return new Promise((resolve, reject) => {
    const req = reqwest({
      url: requestUrl,
      method,
      data: body,
      headers,
      type,
      crossOrigin
    })
    .then((response) => {
      const res = {
        // headers: response.headers,
        status: req.request.status,
        body: response
      };
      resolve(res);
    })
    .catch(err => reject(err));
  });
}

export default hahooRequestReqwest;
