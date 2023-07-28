import parse from '../utils/parse.js';
import addingDataParsed from '../utils/addingDataParsed.js';
import dataUpdate from '../utils/dataUpdate.js';

export default (elements, watchedState, schema, i18n) => {
  elements.form.formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    return schema
      .validate(data, { abortEarly: false })
      .then((valided) => {
        if (watchedState.feeds.urls.includes(valided.url)) {
          throw new Error(i18n.t('errors.duplicate'));
        }

        watchedState.feeds.urls.push(valided.url);
        watchedState.messages.error = null;

        return valided.url;
      })
      .then((url) => parse(url))
      .then((parsed) => {
        try {
          addingDataParsed(parsed, watchedState);

          watchedState.processing = 'parsed';
          watchedState.messages.success = i18n.t('processing.load');
          watchedState.processing = 'loaded';
        } catch (error) {
          watchedState.feeds.urls.splice(-1, 1);
          throw new Error(i18n.t('errors.parse'));
        }
      })
      .then(() => dataUpdate(watchedState))
      .catch((error) => {
        watchedState.messages.success = null;
        watchedState.messages.error = error.message;
      });
  });
};
