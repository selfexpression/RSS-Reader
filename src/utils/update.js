import parse from './parse.js';
import getAxiosResponse from './getAxiosResponse.js';
import createPost from './createPost.js';

const getNewPost = (coll1, coll2) => coll1
  .filter(({ title: title1 }) => !coll2.some(({ title: title2 }) => title1 === title2));

const update = (state) => state.data.feeds
  .map((item) => item.link)
  .forEach((url) => {
    getAxiosResponse(url)
      .then((contents) => {
        const parsed = parse(contents);
        const { feeds, posts: updated } = parsed;
        const currentPosts = state.data.posts;
        const newPosts = getNewPost(updated, currentPosts);

        const newPostFromUpdate = createPost(newPosts, feeds.id);

        if (newPosts.length !== 0) {
          state.data.posts.unshift(...newPostFromUpdate);
        }
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setTimeout(update, 5000, state));
  });

export default update;
