import axios from 'axios';
import proxify from './proxify.js';

export default (url) => new Promise((resolve, reject) => {
  const origin = proxify(url);
  axios.get(origin)
    .then((response) => resolve(response.data.contents))
    .catch((error) => {
      error.name = 'network';
      reject(error);
    });
});
