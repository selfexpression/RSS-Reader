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
        const checking = state.dates.lastPostDate < postDateTimestamp;

        resolve(checking);
      })
      .catch((error) => reject(error))
      .finally(() => setTimeout(dataUpdate, 5000, state));
  });
});

export default dataUpdate;
