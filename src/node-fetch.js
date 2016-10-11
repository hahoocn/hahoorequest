import fetch from 'node-fetch';
import { makeOptions, addQs } from './utils';

function hahooRequestNodeFetch(url, options) {
  const opts = makeOptions(url, options);
  const { method, credentials, qs, type } = opts;
  let { body, headers } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  switch (type.toLowerCase()) {
    case 'json':
      body = JSON.stringify(body);
      if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put' ||
      method.toLowerCase() === 'patch') {
        headers = Object.assign({}, headers, {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        });
      }
      break;
    case 'form':
      /* global FormData:false */
      body = new FormData(body);
      break;
    default:
      if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put' ||
      method.toLowerCase() === 'patch') {
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
    .then((response) => {
      res = {
        status: response.status,
        statusText: response.statusText
      };
      let data = {};
      if (response.status !== 204) {
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
      }
      return data;
    })
    .then((data) => {
      if (res.status < 200 || res.status >= 300) {
        let errors = {
          errcode: res.status,
          errmsg: ''
        };
        if (data && typeof data === 'object') {
          errors = Object.assign({}, errors, data);
        }
        if (data && typeof data === 'string') {
          errors = Object.assign({}, errors, { errmsg: data });
        }
        res = Object.assign({}, res, errors);
        reject(res);
      } else {
        res.body = data;
        resolve(res);
      }
    })
    .catch(err => reject({ status: 0, statusText: '', errcode: -1, errmsg: `${err}` }));
  });
}

export default hahooRequestNodeFetch;
