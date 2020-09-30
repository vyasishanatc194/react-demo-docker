const request = new XMLHttpRequest();

export const requestPost = (requestData, requestUrl) => {
  return new Promise((resolve, reject) => {
    request.open('POST', requestUrl, true);
    request.withCredentials = true;
    request.responseType = '';
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(requestData);

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const res = request.responseText;
          resolve(res);
        } else {
          const error = request.responseText;
          console.log(error);
          reject(error);
        }
      }
    };
  });
};

export const requestPostJSON = (requestData, requestUrl, token) => {
  return new Promise((resolve, reject) => {
    request.open('POST', requestUrl, true);
    request.withCredentials = false;
    request.responseType = '';
    request.setRequestHeader('Content-type', 'application/json');
    if (token !== '') request.setRequestHeader('token', token);
    request.send(requestData);

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const res = request.responseText;
          resolve(res);
        } else {
          const error = request.responseText;
          console.log(error);
          reject(error);
        }
      }
    };
  });
};

export const requestGet = (requestUrl, token = '') => {
  return new Promise((resolve, reject) => {
    request.open('GET', requestUrl, true);
    request.withCredentials = true;
    request.responseType = '';
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    if (token !== '') request.setRequestHeader('token', token);
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const res = request.responseText;
          resolve(res);
        } else {
          const error = request.responseText;
          console.log(error);
          reject(error);
        }
      }
    };
  });
};

export const requestPut = (requestData, requestUrl, token) => new Promise((resolve, reject) => {
  request.open('PUT', requestUrl, true);
  request.withCredentials = false;
  request.responseType = '';
  request.setRequestHeader('Content-type', 'application/json');
  request.setRequestHeader('token', token);
  request.send(requestData);

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        const res = request.responseText;
        resolve(res);
      } else {
        const error = request.responseText;
        console.log(error);
        reject(error);
      }
    }
  };
});
