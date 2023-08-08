export default (elements, watchedstate) => {
  elements.postsContainer.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-id')) {
      watchedstate.modal.watchedFeed = e.target.parentElement;
      watchedstate.modal.isWatched = true;
    }

    watchedstate.modal.isWatched = false;

    if (e.target.tagName === 'BUTTON') {
      watchedstate.modal.modalButton = e.target;
    }
  });
};
