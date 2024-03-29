export function makeOptions(url, options) {
  const defaultoptions = {
    url: undefined,
    method: 'GET',
    qs: undefined,
    body: undefined,
    headers: undefined,
    type: 'json',
    contentType: 'application/json',
    crossOrigin: true,
    credentials: undefined
  };

  let thisoptions = {};
  if (!options) {
    thisoptions = url;
  } else {
    thisoptions = options;
    if (url) {
      thisoptions.url = url;
    }
  }
  thisoptions = { ...defaultoptions, ...thisoptions };

  return thisoptions;
}

export function addQs(url, qs) {
  let queryString = '';
  let newUrl = url;
  if (qs && typeof qs === 'object') {
    Object.keys(qs).forEach((k) => {
      queryString += `&${k}=${qs[k]}`;
    });
    if (queryString.length > 0) {
      if (url.split('?').length < 2) {
        queryString = queryString.substring(1);
      } else if (url.split('?')[1].length === 0) {
        queryString = queryString.substring(1);
      }
    }

    if (url.indexOf('?') === -1) {
      newUrl = `${url}?${queryString}`;
    } else {
      newUrl = `${url}${queryString}`;
    }
  }

  return newUrl;
}
