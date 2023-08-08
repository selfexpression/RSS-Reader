import _ from 'lodash';

export default (posts, feedID) => posts
  .map((post) => {
    post.id = _.uniqueId;
    post.feedID = feedID;
    return post;
  });
