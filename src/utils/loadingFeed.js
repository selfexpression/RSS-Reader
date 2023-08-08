import _ from 'lodash';
import parse from './parse.js';
import getAxiosResponse from './getAxiosResponse.js';
import update from './update.js';
import createPost from './createPost.js';

export default (url, state) => {
  getAxiosResponse(url)
    .then((data) => {
      const { feeds, posts } = parse(data);

      feeds.id = _.uniqueId();
      feeds.link = url;

      const postsFromFeed = createPost(posts, feeds.id);

      state.processing = 'LOADED';
      state.data.feeds.push(feeds);
      postsFromFeed.forEach((post) => state.data.posts.push(post));

      update(state);
    })
    .catch((error) => {
      state.processing = 'FILLING';
      state.error = error.name;
      throw error;
    });
};
