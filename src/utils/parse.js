import axios from 'axios';
import makeOrigin from './makeOrigin.js';

export default (urls) => new Promise((resolve, reject) => {
  const newURL = urls.at(-1);
  const origin = makeOrigin(newURL);
  axios.get(origin)
    .then((response) => response.data.contents)
    .then((contents) => {
      const parser = new DOMParser();
      const parsedData = parser.parseFromString(contents, 'text/xml');
      resolve(parsedData);
    })
    .catch((error) => reject(error));
});
