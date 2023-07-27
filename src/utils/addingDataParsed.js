import _ from 'lodash';

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
    const itemTitle = item.querySelector('title').textContent;
    const itemDescription = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    const postData = {
      feedID: feeds.id,
      id: _.uniqueId(),
      pubDate: Date.now(),
      link,
      title: itemTitle,
      description: itemDescription,
    };

    state.dates.postDates.push(postData.pubDate);
    return postData;
  });

  state.feeds.data.feed.push(feeds);
  posts.forEach((post) => state.feeds.data.post.push(post));
};
