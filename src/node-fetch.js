import fetch from 'node-fetch';
import { makeOptions, addQs, checkStatus } from './utils';

function hahooRequestNodeFetch(url, options) {
  const opts = makeOptions(url, options);
  const { method, credentials, qs, type } = opts;
  let { body, headers } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  switch (type.toLowerCase()) {
    case 'json':
      body = JSON.stringify(body);
      if (method.toLowerCase() === 'post') {
        headers = Object.assign({}, headers, {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        });
      }
      break;
    case 'form':
      body = new FormData(body);
      break;
    default:
      if (method.toLowerCase() === 'post') {
        headers = Object.assign({}, headers, {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'x-www-form-urlencoded'
        });
      }
  }

  return new Promise((resolve, reject) => {
    let res = {};
    fetch(requestUrl, {
      method,
      headers,
      body,
      credentials
    })
    .then(checkStatus)
    .then((response) => {
      res = {
        headers: response.headers,
        status: response.status,
        response: response.statusText
      };

      let data = undefined;
      switch (type.toLowerCase()) {
        case 'html':
        case 'text':
          data = response.text();
          break;
        case 'json':
          data = response.json();
          break;
        case 'form':
          data = response.formData();
          break;
        case 'jpg':
        case 'png':
        case 'gif':
        case 'img':
          data = response.blob();
          break;
        default:
          data = response.text();
          break;
      }
      return data;
    })
    .then((data) => {
      res.body = data;
      resolve(res);
    })
    .catch(err => reject(err));
  });
}

export default hahooRequestNodeFetch;
