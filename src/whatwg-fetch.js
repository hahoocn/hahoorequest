import 'whatwg-fetch';
import { makeOptions, addQs } from './utils';

function hahooRequestWhatwgFetch(url, options) {
  const opts = makeOptions(url, options);
  const { method, headers, body, credentials, qs } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  return new Promise((resolve, reject) => {
    fetch(opts.url, {
      method,
      headers,
      body: JSON.stringify(body),
      credentials,
    })
    .then(res => resolve(res))
    .catch(err => reject(err));
  });
}

export default hahooRequestWhatwgFetch;
