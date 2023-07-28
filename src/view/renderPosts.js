import renderContainers from './renderContainers.js';
import createPostList from './createPostList.js';

export default (elements, state, i18n) => {
  const type = 'post';
  const { postEl } = elements.feed;
  postEl.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.feeds.data.posts.forEach((item) => {
    const list = createPostList(item, i18n);
    ul.append(list);
  });

  renderContainers(elements.feed.postEl, ul, i18n, type);

  elements.form.formEl.reset();
  elements.form.input.focus();
};
