import axios from 'axios';
import firebase from 'firebase';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function requestWithoutAuth(url, options) {
  const headers = options.headers || {};

  return axios({
    method: options.method,
    url,
    headers: { ...headers },
    data: options.body,
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  const headers = options.headers || {};
  return firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(idToken => {
      const auth = idToken && { Authorization: `Bearer ${idToken}` };

      return axios({
        method: options.method,
        url,
        headers: { ...auth, ...headers },
        data: options.body,
      });
    });
}