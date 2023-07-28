import _ from 'lodash';

export default (post, feedID) => {
  const postTitle = post.querySelector('title').textContent;
  const postDescription = post.querySelector('description').textContent;
  const link = post.querySelector('link').textContent;

  const postData = {
    feedID,
    id: _.uniqueId(),
    pubDate: Date.now(),
    link,
    title: postTitle,
    description: postDescription,
  };

  return postData;
};
