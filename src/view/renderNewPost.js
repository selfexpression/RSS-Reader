import createPostList from './createPostList.js';

export default (state, i18n) => {
  const container = document.querySelector('ul.list-group');
  const newPost = state.feeds.data.newPosts.at(-1, 1);

  const list = createPostList(newPost, i18n);
  container.prepend(list);
};
