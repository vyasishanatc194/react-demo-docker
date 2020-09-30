const request = new XMLHttpRequest();

const errorHandling = (request, history, reject) => {
  switch (request.status) {
    case 0:
      reject({
        code: 0,
        text: 'Request aborted. Please check your connection.',
      });
      break;
    case 401:
      reject({
        code: 401,
        text: 'You are not logged in or your session has expired. Please log in again.',
      });
      break;
    case 403:
      reject({
        code: 403,
        text: 'The item that you requested cannot be accessed.',
      });
      break;
    case 404:
      reject({
        code: 404,
        text: 'The item that you requested could not be found.',
      });
      break;
    case 500:
      reject({ code: 500, text: 'Server error. Please try again later.' });
      break;
    default:
      reject({ code: request.status, text: 'An error has occurred.' });
      console.error(request);
  }
};

export const requestGet = (url, history, responseType = '') => {
  return new Promise((resolve, reject) => {
    request.open('GET', url, true);
    request.withCredentials = true;
    request.responseType = responseType;
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.response);
          console.log(request.responseText);
          resolve(request.response);
        } else {
          errorHandling(request, history, reject);
        }
      }
    };
  });
};

export const requestPost = (url, requestData, history) => {
  return new Promise((resolve, reject) => {
    request.open('POST', url, true);
    request.withCredentials = true;
    request.responseType = '';
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(requestData);

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.response);
          console.log(request.responseText);
          resolve(request.response);
        } else {
          errorHandling(request, history, reject);
        }
      }
    };
  });
};
