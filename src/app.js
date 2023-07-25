import i18next from 'i18next';
import * as yup from 'yup';
import watch from './view/view.js';
import resources from './locales/index.js';

const i18n = (language) => new Promise((resolve, reject) => {
  i18next
    .init({
      lng: language,
      debug: false,
      resources,
    })
    .then(() => resolve(i18next))
    .catch((error) => reject(error));
});

export default () => {
  const state = {
    form: {
      valid: false,
    },
    feeds: {
      urls: [],
      valid: false,
    },
    error: null,
  };

  const elements = {
    form: {
      formEl: document.querySelector('#rss-form'),
      input: document.querySelector('#url-input'),
    },
  };

  const defaultLang = 'ru';

  return i18n(defaultLang).then((i18nInstance) => {
    yup.setLocale({
      string: {
        url: () => i18nInstance.t('errors.validationURL'),
      },
    });

    const schema = yup.object().shape({
      url: yup.string().url(),
    });

    const watchedState = watch(elements, state);

    elements.form.formEl.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      const validateData = schema.validate(data, { abortEarly: false });
      return validateData.then((valided) => {
        if (watchedState.feeds.urls.includes(valided.url)) {
          throw new Error(i18nInstance.t('errors.duplicate'));
        }
        watchedState.feeds.urls.push(valided.url);
        watchedState.form.valid = true;
        watchedState.error = null;
        console.log(watchedState)
      })
        .catch((error) => {
          watchedState.error = error.message;
          console.log(watchedState)
        });
    });
  });
};
