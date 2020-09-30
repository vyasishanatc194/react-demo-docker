import { dispatch } from './Redux';
import { setAuthenticatedStatus, setAuthenticationError } from 'Actions/authActions';
import { saveUserInfo, clearUserInfo } from 'Actions/userActions';
import { getUrl } from 'Network/urls';
import { requestPostJSON } from 'Network/requests';

class AuthService {
  login = (email, password, history) => {
    const request = new XMLHttpRequest();
    const url = getUrl('get_token');

    request.open('POST', url, true);
    request.timeout = 5000;
    request.withCredentials = false;
    request.responseType = '';
    request.setRequestHeader('Content-type', 'application/json');

    const data = JSON.stringify({
      email,
      password,
    });

    request.send(data);

    request.ontimeout = () => {
      dispatch(setAuthenticationError('Zeitüberschreitung beim Verbindungsaufbau...'));
    };

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const userData = JSON.parse(request.response).user;
          localStorage.setItem('jwt', JSON.parse(request.response).token);
          dispatch(saveUserInfo(userData));
          history.push('/admin/startseite');
          console.log('Successfully logged in.');
        } else {
          switch (request.status) {
            case 400:
            case 401:
              dispatch(setAuthenticationError('Falsche Email oder Passwort'));
              break;
            case 500:
              dispatch(setAuthenticationError('Service nicht verfügbar'));
              break;
            default:
              dispatch(setAuthenticationError('Ein Fehler ist aufgetreten'));
              console.log(`${request.status}: ${request.statusText}`);
          }
        }
      }
    };
  };

  checkUserAuth = () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');

      if (token) {
        const url = getUrl('check_token');
        const data = JSON.stringify({
          check: 'token',
        });

        requestPostJSON(data, url, token)
          .then((res) => {
            const userData = JSON.parse(res).user;
            dispatch(saveUserInfo(userData));
            resolve();
          })
          .catch((err) => {
            console.log(err);
            resolve();
          });
      } else {
        resolve();
      }
    });
  };

  logout = () => {
    localStorage.removeItem('jwt');
    dispatch(clearUserInfo());
    window.location.reload();
  };
}

export default new AuthService();
