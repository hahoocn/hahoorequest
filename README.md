# hahoorequest
A HTTP request abstract library, use other http request libraries in one way. Isomorphic request to work in Node or in the browser. For example React isomorphism, the same code for the server and the browser.

## Why
* Different libraries use different syntax, the replacement library will lead to a large number of changes
* The browser and the server can use the same code for different libraries. For example: the browser with [reqwest](https://github.com/ded/reqwest), the server with [request](https://github.com/request/request). Or both the browser and the server are using fetch.

## Install
```
npm install hahoorequest --save
```
## Import library
Select the library you want to use
### Browser & Server

##### Browser with fetch, Server with fetch
```
import request from 'hahoorequest/lib/fetch';
```
##### Browser with fetch, Server with request
```
import request from 'hahoorequest/lib/fetch-request';
```
##### Browser with reqwest, Server with fetch
```
import request from 'hahoorequest/lib/reqwest-fetch';
```
##### Browser with reqwest, Server with request
```
import request from 'hahoorequest/lib/reqwest-request';
```
##### Browser with superagent, Server with superagent
```
import request from 'hahoorequest/lib/superagent';
```
##### Browser with superagent, Server with fetch
```
import request from 'hahoorequest/lib/superagent-fetch';
```
##### Browser with superagent, Server with request
```
import request from 'hahoorequest/lib/superagent-request';
```
### Browser

##### [fetch](https://github.com/github/fetch)
```
import request from 'hahoorequest/lib/whatwg-fetch';
```
##### [reqwest](https://github.com/ded/reqwest)
```
import request from 'hahoorequest/lib/reqwest';
```
##### [superagent](https://github.com/visionmedia/superagent)
```
import request from 'hahoorequest/lib/superagent';
```
### Server

##### [node-fetch](https://github.com/bitinn/node-fetch)
```
import request from 'hahoorequest/lib/node-fetch';
```
##### [request](https://github.com/request/request)
```
import request from 'hahoorequest/lib/node-request';
```
## Usage
Return Promises
```javascript
request({
  url: 'https://raw.githubusercontent.com/hahoocn/hahoorequest/master/test/test.json',
  method: 'GET',
  type: 'json'
})
.then((res) => {
  console.log(res.body);
});
```
## Options
* `url` a fully qualified uri
* `method` http method (default: `GET`)
* `headers` http headers
* `body` entity body for `PATCH`, `POST` and `PUT` requests. Must be a query `String` or `JSON` object
* `type` a string enum. `html`, `xml`, `json`, `form`, `png`... (default: `json`)
* `qs` object containing querystring values to be appended to the url
* `credentials` Sending cookies. fetch set credentials option. if credentials is not undefined, reqwest and superagent will add `withCredentials = true`

## Response
* `response.body` Content of response
* `response.status` http status code

## Errors
* `response.errcode` Code of errors
* `response.errmsg` Content of errors
