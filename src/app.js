import i18next from 'i18next';
import * as yup from 'yup';
import watch from './view/index.js';
import resources from './locales/index.js';
import formController from './controllers/formController.js';
import postsController from './controllers/postsController.js';

export default () => {
  const state = {
    processing: null,
    dates: {
      lastPostDate: null,
    },
    feeds: {
      urls: [],
      data: {
        feeds: [],
        posts: [],
        newPosts: [],
      },
    },
    messages: {
      success: null,
      error: null,
    },
    modal: {
      watchedFeed: null,
      isWatched: false,
      modalButton: null,
    },
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
    posts: {
      postsContainer: document.querySelector('div.posts'),
    },
    modal: {
      modalHeader: document.querySelector('.modal-header'),
      modalBody: document.querySelector('.modal-body'),
      modalFooter: document.querySelector('.modal-footer'),
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

      formController(elements, watchedState, schema, i18n);
      postsController(elements, watchedState);
    });
};
