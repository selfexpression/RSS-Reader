import parse from './parse.js';
import createNewPost from './createNewPost.js';

const dataUpdate = (state) => new Promise((resolve, reject) => {
  state.feeds.urls.forEach((url) => {
    parse(url)
      .then((parsed) => {
        const items = parsed.querySelectorAll('item');
        const dates = [...items].map((item) => {
          const pubDate = item.querySelector('pubDate').textContent;
          const dateParse = new Date(pubDate);

          return dateParse;
        });

        const freshestDate = (new Date(Math.max(...dates)));

        const lastItem = [...items].find((item) => {
          const pubDate = item.querySelector('pubDate').textContent;
          const dateParse = new Date(pubDate);

          const lastTimestamp = dateParse.getTime();
          const freshestTimestamp = freshestDate.getTime();

          return lastTimestamp === freshestTimestamp;
        });

        const pubDate = lastItem.querySelector('pubDate').textContent;
        const dateParse = new Date(pubDate);
        const postDateTimestamp = dateParse.getTime();

        const prevPost = state.feeds.data.posts
          .find((item) => Number(item.id) === Math.max(...state.feeds.data.posts
            .map((element) => element.id)));

        const feedID = Number(prevPost.feedID);

        if (state.dates.lastPostDate < postDateTimestamp) {
          const postData = createNewPost(lastItem, feedID);

          state.dates.lastPostDate = postDateTimestamp;
          state.feeds.data.newPosts.push(postData);
        }

        resolve(lastItem);
      })
      .catch((error) => reject(error))
      .finally(() => setTimeout(dataUpdate, 5000, state));
  });
});

export default dataUpdate;
