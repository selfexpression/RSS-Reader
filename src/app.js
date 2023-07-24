import * as yup from 'yup';
import watch from './view/view.js';

export default () => {
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  const state = {
    form: {
      valid: false,
    },
    feeds: {
      urls: [],
      valid: false,
    },
    errors: [],
  };

  const elements = {
    form: {
      formEl: document.querySelector('#rss-form'),
      input: document.querySelector('#url-input'),
    },
  };

  const watchedState = watch(elements, state);

  elements.form.formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const validateData = schema.validate(data, { abortEarly: false });
    return validateData.then((valided) => {
      if (watchedState.feeds.urls.includes(valided.url)) {
        throw new Error('RSS уже существует');
      }
      watchedState.feeds.urls.push(valided.url);
      watchedState.form.valid = true;
      watchedState.errors = [];
    })
      .catch((error) => {
        watchedState.errors.push(error.message);
      });
  });
};
