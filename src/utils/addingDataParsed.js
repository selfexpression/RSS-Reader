import _ from 'lodash';

export default (parsed, state) => {
  const feedID = _.uniqueId();
  const postID = _.uniqueId();
  const feedTitle = parsed.querySelector('title');
  const feedDescription = parsed.querySelector('description');
  const items = parsed.querySelectorAll('item');

  const feeds = {
    feedID,
    title: feedTitle.textContent,
    description: feedDescription.textContent,
  };

  const posts = [...items].map((item) => {
    const itemTitle = item.querySelector('title');
    const itemDescription = item.querySelector('description');
    const link = item.querySelector('link');
    const titleContent = itemTitle.textContent;
    const descriptionContent = itemDescription.textContent;
    const linkContent = link.textContent;

    const postData = {
      feedID,
      postID,
      link: linkContent,
      title: titleContent,
      description: descriptionContent,
    };

    return postData;
  });

  state.feeds.data.feed.push(feeds);
  posts.forEach((post) => state.feeds.data.post.push(post));
};
