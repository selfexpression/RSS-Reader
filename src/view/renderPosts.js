import renderContainers from './renderContainers.js';
import createPostList from './createPostList.js';

export default (elements, state, i18n) => {
  const type = 'post';
  const { postEl } = elements.feed;
  postEl.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const sorted = state.feeds.data.posts.sort((a, b) => b.id - a.id);
  const lists = sorted.map((item) => createPostList(item, i18n));
  ul.replaceChildren(...lists);

  renderContainers(elements.feed.postEl, ul, i18n, type);
};
