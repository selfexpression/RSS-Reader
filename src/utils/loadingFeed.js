import uniqueId from 'lodash';
import parse from './parse.js';
import getAxiosResponse from './getAxiosResponse.js';
import update from './update.js';

export default (url, state) => {
  getAxiosResponse(url)
    .then((data) => {
      const { feeds, posts } = parse(data);

      feeds.id = uniqueId();

      const postsFromFeed = posts.map((post) => {
        post.id = uniqueId();
        post.feedID = feeds.id;
        return post;
      });

      state.processing = 'LOADED';
      state.feeds.data.feeds.push(feeds);
      postsFromFeed.forEach((post) => state.feeds.data.posts.push(post));

      update(state);
    })
    .catch((error) => {
      state.processing = 'FILLING';
      state.messages.error = error.message;
    });
};
