import onChange from 'on-change';
import renderProcessing from './renderProcessing.js';

const renderContainers = (element, list, i18n, type) => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t(`data.${type}.header`);

  cardBody.replaceChildren(h2);
  cardContainer.replaceChildren(cardBody, list);
  element.replaceChildren(cardContainer);
};

const renderFeeds = (elements, state, i18n) => {
  const type = 'feed';
  const { feedEl } = elements;
  feedEl.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const lists = state.data.feeds.map((item) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = item.title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = item.description;

    li.append(h3, p);
    return li;
  });

  ul.replaceChildren(...lists);
  renderContainers(elements.feedEl, ul, i18n, type);
};

const renderModalContent = (elements, state) => {
  const button = state.modal.modalButton;
  const buttonID = button.dataset.id;
  const feed = state.data.posts.find((post) => post.id === buttonID);

  elements.modal.modalHeader.querySelector('h5').textContent = feed.title;
  elements.modal.modalBody.textContent = feed.description;
  elements.modal.modalFooter.querySelector('a').setAttribute('href', feed.link);
};

const renderPosts = (elements, state, i18n) => {
  const type = 'post';
  const { postEl } = elements;
  postEl.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const lists = state.data.posts.map((item) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', item.link);
    a.setAttribute('data-id', item.id);
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('target', '_blank');
    a.setAttribute('class', 'fw-bold');
    a.textContent = item.title;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', item.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('data.post.button');

    li.append(a, button);
    return li;
  });

  ul.replaceChildren(...lists);
  renderContainers(postEl, ul, i18n, type);
};

const renderWatchedFeed = (state) => {
  const targetEl = state.modal.watchedFeed;
  const link = targetEl.querySelector('a');
  link.classList.remove('fw-bold');
  link.classList.add('fw-normal', 'link-secondary');
};

export default (elements, state, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'processing':
        renderProcessing(elements, state, value, i18n);
        break;
      case 'data.feeds':
        renderFeeds(elements, state, i18n);
        break;
      case 'data.posts':
        renderPosts(elements, state, i18n);
        break;
      case 'modal.isWatched':
        renderWatchedFeed(state);
        break;
      case 'modal.modalButton':
        renderModalContent(elements, state);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
