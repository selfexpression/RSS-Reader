export default (elements, watchedstate) => {
  const container = elements.posts.postsContainer;
  const modalButton = container.querySelector('button');
  console.log(modalButton, watchedstate);
};
