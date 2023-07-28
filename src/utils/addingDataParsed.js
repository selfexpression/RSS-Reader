import _ from 'lodash';
import createNewPost from './createNewPost.js';

export default (parsed, state) => {
  const feedTitle = parsed.querySelector('title').textContent;
  const feedDescription = parsed.querySelector('description').textContent;

  const feeds = {
    id: _.uniqueId(),
    title: feedTitle,
    description: feedDescription,
  };

  const items = parsed.querySelectorAll('item');
  const posts = [...items].map((item) => {
    const postData = createNewPost(item, feeds.id);

    state.dates.lastPostDate = postData.pubDate;
    return postData;
  });

  state.feeds.data.feeds.push(feeds);
  posts.forEach((post) => state.feeds.data.posts.push(post));
};
