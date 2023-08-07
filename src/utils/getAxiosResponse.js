import axios from 'axios';
import proxify from './proxify.js';

export default (url, i18n) => new Promise((resolve, reject) => {
  const origin = proxify(url);
  axios.get(origin)
    .then((response) => resolve(response.data.contents))
    .catch(() => {
      const networkError = new Error(i18n.t('network'));
      reject(networkError);
    });
});
