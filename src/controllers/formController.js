import loadingFeed from '../utils/loadingFeed.js';
import validate from '../utils/validate.js';

export default (elements, watchedState, i18n) => {
  elements.form.formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    validate(data)
      .then((url) => {
        if (watchedState.feeds.urls.includes(url)) {
          throw new Error(i18n.t('duplicate'));
        }

        watchedState.feeds.urls.push(url);
        watchedState.messages.error = null;
        watchedState.processing = 'LOADING';

        loadingFeed(url, watchedState);
      })
      .catch((error) => {
        watchedState.messages.error = error.message;
      });
  });
};
