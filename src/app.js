import i18next from 'i18next';
import * as yup from 'yup';
import watch from './view/view.js';
import resources from './locales/index.js';
import parse from './utils/parse.js';
import addingDataParsed from './utils/addingDataParsed.js';

export default () => {
  const state = {
    processing: null,
    form: {
      valid: false,
    },
    feeds: {
      urls: [],
      data: {
        feed: [],
        post: [],
      },
    },
    error: null,
  };

  const elements = {
    form: {
      formEl: document.querySelector('#rss-form'),
      input: document.querySelector('#url-input'),
    },
    feed: {
      feedEl: document.querySelector('.feeds'),
      postEl: document.querySelector('.posts'),
    },
  };

  const defaultLang = 'ru';

  const i18nInstance = new Promise((resolve, reject) => {
    i18next
      .init({
        lng: defaultLang,
        debug: false,
        resources,
      })
      .then(() => resolve(i18next))
      .catch((error) => reject(error));
  });

  return i18nInstance
    .then((i18n) => {
      yup.setLocale({
        string: {
          url: () => i18n.t('errors.validationURL'),
        },
      });

      const schema = yup.object().shape({
        url: yup.string().url(),
      });

      const watchedState = watch(elements, state, i18n);

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
            watchedState.form.valid = true;
            watchedState.error = null;
          })
          .then(() => parse(watchedState.feeds.urls))
          .then((parsed) => {
            addingDataParsed(parsed, watchedState);
            watchedState.processing = 'parsed';
            watchedState.processing = 'loaded';
          })
          .catch((error) => {
            console.log(error)
            watchedState.error = error.message;
          });
      });
    });
};
