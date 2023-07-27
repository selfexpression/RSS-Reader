import getAxiosResponse from './getAxiosResponse.js';

export default (url) => new Promise((resolve, reject) => {
  getAxiosResponse(url)
    .then((contents) => {
      const parser = new DOMParser();
      const parsedData = parser.parseFromString(contents, 'text/xml');
      resolve(parsedData);
    })
    .catch((error) => reject(error));
});
