export default (elements, state) => {
  const button = state.modal.modalButton;
  const buttonID = button.dataset.id;
  const feed = state.feeds.data.posts.find((post) => post.id === buttonID);

  elements.modal.modalHeader.querySelector('h5').textContent = feed.title;
  elements.modal.modalBody.textContent = feed.description;
  elements.modal.modalFooter.querySelector('a').setAttribute('href', feed.link);
};
