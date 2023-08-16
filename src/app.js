import * as yup from 'yup';
import _ from 'lodash';
import i18next from 'i18next';
import axios from 'axios';
import watch from './view/index.js';
import resources from './locales/index.js';

const validate = (data, uploadedRSS, state) => {
  yup.setLocale({
    string: {
      url: () => 'validationError',
    },
  });

  const scheme = yup.object().shape({
    url: yup.string().url().notOneOf(uploadedRSS, 'duplicateError'),
  });

  return scheme.validate(data, { abortEarly: false })
    .then(({ url }) => Promise.resolve(url))
    .catch((error) => {
      state.error = error.message;
      state.processing = 'ERROR';
      throw error;
    })
    .finally(() => {
      state.processing = 'FILLING';
    });
};

const parseData = (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'text/xml');
  const errorElement = parsedData.querySelector('parsererror');

  if (errorElement) {
    throw new Error(errorElement.textContent);
  }

  const feedTitle = parsedData.querySelector('title').textContent;
  const feedDescription = parsedData.querySelector('description').textContent;

  const feed = {
    title: feedTitle,
    description: feedDescription,
  };

  const items = parsedData.querySelectorAll('item');
  const posts = [...items].reduce((acc, item) => {
    const postTitle = item.querySelector('title').textContent;
    const postDescription = item.querySelector('description').textContent;

    const postData = {
      title: postTitle,
      description: postDescription,
    };

    return [...acc, postData];
  }, []);

  return { feed, posts };
};

const parse = (data) => {
  try {
    return parseData(data);
  } catch (error) {
    error.name = 'RSSError';
    throw error;
  }
};

const proxify = (url) => {
  const proxyURL = new URL('https://allorigins.hexlet.app/get?');
  proxyURL.searchParams.set('disableCache', true);
  proxyURL.searchParams.set('url', url);
  return proxyURL.toString();
};

const getAxiosResponse = (url) => {
  const origin = proxify(url);
  return axios.get(origin)
    .then((response) => Promise.resolve(response.data.contents))
    .catch((error) => {
      throw error;
    });
};

const createPost = (posts, feedID) => posts
  .map((post) => {
    post.id = _.uniqueId();
    post.feedID = feedID;
    return post;
  });

const loadingFeed = (url, state) => {
  getAxiosResponse(url)
    .then((data) => {
      const { feed, posts } = parse(data, state);

      feed.id = _.uniqueId();
      feed.link = url;

      const postsFromFeed = createPost(posts, feed.id);

      state.processing = 'LOADED';
      state.data.feeds.unshift(feed);
      postsFromFeed.forEach((post) => state.data.posts.unshift(post));
    })
    .catch((error) => {
      state.error = error.name;
      state.processing = 'ERROR';
      throw error;
    })
    .finally(() => {
      state.processing = 'FILLING';
    });
};

const getNewPost = (coll1, coll2) => coll1
  .filter(({ title: title1 }) => !coll2.some(({ title: title2 }) => title1 === title2));

const update = (state) => {
  const { feeds } = state.data;
  const currentPosts = state.data.posts;

  const promises = feeds.map((item) => {
    const { link } = item;

    return getAxiosResponse(link)
      .then((contents) => {
        const parsed = parse(contents, state);
        const { feed, posts: updated } = parsed;
        const newPosts = getNewPost(updated, currentPosts);

        const newPostFromUpdate = createPost(newPosts, feed.id);

        if (newPosts.length !== 0) {
          state.data.posts.unshift(...newPostFromUpdate);
        }
      });
  });

  Promise.all(promises).finally(() => {
    setTimeout(update, 5000, state);
  });
};

const formController = (elements, watchedState) => {
  elements.formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const uploadedRSS = watchedState.data.feeds.map((feed) => feed.link);

    watchedState.processing = 'LOADING';

    validate(data, uploadedRSS, watchedState)
      .then((url) => {
        watchedState.error = null;

        loadingFeed(url, watchedState);
      });
  });
};

const postsController = (elements, watchedstate) => {
  elements.postsContainer.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-id')) {
      watchedstate.modal.watchedFeed = e.target.parentElement;
      watchedstate.modal.isWatched = true;
    }

    watchedstate.modal.isWatched = false;

    if (e.target.tagName === 'BUTTON') {
      watchedstate.modal.modalButton = e.target;
    }
  });
};

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
      update(watchedState);
    });
};
