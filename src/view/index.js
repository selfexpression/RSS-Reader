import onChange from 'on-change';
import renderError from './renderError.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import renderWatchedFeed from './renderWatchedFeed.js';
import renderModalContent from './renderModalContent.js';
import renderProcessing from './renderProcessing.js';

export default (elements, state, i18n) => {
  const watchedState = onChange(state, (path, value, prevValue) => {
    switch (path) {
      case 'messages.error': {
        renderError(elements, value, prevValue, i18n);
        break;
      }
      case 'processing': {
        renderProcessing(elements, value, i18n);
        break;
      }
      case 'feeds.data.feeds': {
        renderFeeds(elements, state, i18n);
        break;
      }
      case 'feeds.data.posts': {
        renderPosts(elements, state, i18n);
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
