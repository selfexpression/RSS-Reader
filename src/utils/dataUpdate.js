import _ from 'lodash';
import parse from './parse.js';

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

        return lastItem;
      })
      .then((lastPost) => {
        const pubDate = lastPost.querySelector('pubDate').textContent;
        const dateParse = new Date(pubDate);
        const postDateTimestamp = dateParse.getTime();

        const postTitle = lastPost.querySelector('title').textContent;
        const postDescription = lastPost.querySelector('description').textContent;
        const link = lastPost.querySelector('link').textContent;

        const prevPost = state.feeds.data.posts
          .find((item) => Number(item.id) === Math.max(...state.feeds.data.posts
            .map((element) => element.id)));

        const feedID = Number(prevPost.feedID);

        if (state.dates.lastPostDate < postDateTimestamp) {
          const postData = {
            feedID,
            id: _.uniqueId(),
            pubDate: Date.now(),
            link,
            title: postTitle,
            description: postDescription,
          };

          state.dates.lastPostDate = postDateTimestamp;
          state.feeds.data.newPosts.push(postData);
        }

        resolve(lastPost);
      })
      .catch((error) => reject(error))
      .finally(() => setTimeout(dataUpdate, 5000, state));
  });
});

export default dataUpdate;
