import onChange from 'on-change';
import renderError from './renderError.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderNewPost from './renderNewPost.js';
import renderWatchedFeed from './renderWatchedFeed.js';
import renderModalContent from './renderModalContent.js';
import renderSuccess from './renderSuccess.js';

export default (elements, state, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'messages.error': {
        renderError(elements, state);
        break;
      }
      case 'messages.success': {
        renderSuccess(elements, state);
        break;
      }
      case 'processing': {
        if (value === 'parsed') {
          renderFeeds(elements, state, i18n);
          renderPosts(elements, state, i18n);
        }
        break;
      }
      case 'feeds.data.newPosts': {
        renderNewPost(state, i18n);
        break;
      }
      case 'modal.isWatched': {
        renderWatchedFeed(state);
        break;
      }
      case 'modal.modalButton': {
        renderModalContent(elements, state);
        break;
      }
      default:
        break;
    }
  });

  return watchedState;
};
