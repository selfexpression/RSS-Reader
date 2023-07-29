import getAxiosResponse from './getAxiosResponse.js';

export default (url, i18n = {}) => new Promise((resolve, reject) => {
  getAxiosResponse(url, i18n)
    .then((contents) => {
      const parser = new DOMParser();
      const parsedData = parser.parseFromString(contents, 'text/xml');
      resolve(parsedData);
    })
    .catch((error) => reject(error));
});
