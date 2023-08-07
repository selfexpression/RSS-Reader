import uniqueId from 'lodash';
import parse from './parse.js';
import getAxiosResponse from './getAxiosResponse.js';

const getNewPost = (coll1, coll2) => coll1
  .filter(({ title: title1 }) => !coll2.some(({ title: title2 }) => title1 === title2));

const update = (state) => state.feeds.urls
  .forEach((url) => {
    getAxiosResponse(url)
      .then((contents) => {
        const parsed = parse(contents);
        const { feeds, posts: updated } = parsed;
        const currentPosts = state.feeds.data.posts;
        const newPosts = getNewPost(updated, currentPosts);

        const newPostFromUpdate = newPosts.map((post) => {
          post.id = uniqueId();
          post.feedID = feeds.id;
          return post;
        });

        if (newPosts.length !== 0) {
          state.feeds.data.posts.unshift(...newPostFromUpdate);
        }
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setTimeout(update, 5000, state));
  });

export default update;
