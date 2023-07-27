import axios from 'axios';
import makeOrigin from './makeOrigin.js';

export default (url) => new Promise((resolve, reject) => {
  const origin = makeOrigin(url);
  axios.get(origin)
    .then((response) => resolve(response.data.contents))
    .catch((error) => reject(error));
});
