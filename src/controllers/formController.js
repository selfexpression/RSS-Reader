import loadingFeed from '../utils/loadingFeed.js';
import validate from '../utils/validate.js';

export default (elements, watchedState) => {
  elements.formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    validate(data, watchedState)
      .then((url) => {
        watchedState.error = null;
        watchedState.processing = 'LOADING';

        loadingFeed(url, watchedState);
      })
      .catch((error) => {
        watchedState.error = error.message;
        throw error;
      });
  });
};
