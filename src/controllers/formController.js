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
          throw new Error(i18n.t('duplicate'));
        }

        watchedState.feeds.urls.push(valided.url);
        watchedState.messages.error = null;
        watchedState.processing = 'LOADING';
        return valided.url;
      })
      .then((url) => parse(url, i18n))
      .then((parsed) => {
        try {
          addingDataParsed(parsed, watchedState);
          watchedState.processing = 'LOADED';
        } catch (error) {
          watchedState.processing = 'FILLING';
          watchedState.feeds.urls.splice(-1, 1);
          throw new Error(i18n.t('parse'));
        }
      })
      .then(() => dataUpdate(watchedState))
      .catch((error) => {
        watchedState.processing = 'FILLING';
        watchedState.messages.error = error.message;
      });
  });
};
