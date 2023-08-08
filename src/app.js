import i18next from 'i18next';
import watch from './view/index.js';
import resources from './locales/index.js';
import formController from './controllers/formController.js';
import postsController from './controllers/postsController.js';

export default () => {
  const state = {
    processing: 'FILLING',
    data: {
      feeds: [],
      posts: [],
    },
    error: null,
    modal: {
      watchedFeed: null,
      isWatched: false,
      modalButton: null,
    },
  };

  const elements = {
    formEl: document.querySelector('#rss-form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('[type="submit"]'),
    feedEl: document.querySelector('.feeds'),
    postEl: document.querySelector('.posts'),
    postsContainer: document.querySelector('div.posts'),
    modal: {
      modalHeader: document.querySelector('.modal-header'),
      modalBody: document.querySelector('.modal-body'),
      modalFooter: document.querySelector('.modal-footer'),
    },
  };

  const defaultLang = 'ru';

  const i18nInstance = i18next
    .init({
      lng: defaultLang,
      debug: false,
      resources,
    })
    .then(() => Promise.resolve(i18next));

  return i18nInstance
    .then((i18n) => {
      const watchedState = watch(elements, state, i18n);

      formController(elements, watchedState);
      postsController(elements, watchedState);
    });
};
