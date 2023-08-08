const parse = (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'text/xml');

  const feedTitle = parsedData.querySelector('title').textContent;
  const feedDescription = parsedData.querySelector('description').textContent;

  const feeds = {
    title: feedTitle,
    description: feedDescription,
  };

  const items = parsedData.querySelectorAll('item');
  const posts = [...items].reduce((acc, item) => {
    const postTitle = item.querySelector('title').textContent;
    const postDescription = item.querySelector('description').textContent;

    const postData = {
      title: postTitle,
      description: postDescription,
    };

    return [...acc, postData];
  }, []);

  return { feeds, posts };
};

export default (data) => {
  try {
    return parse(data);
  } catch (error) {
    error.name = 'parseError';
    throw error;
  }
};
