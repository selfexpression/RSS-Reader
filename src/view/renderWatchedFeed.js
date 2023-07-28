export default (state) => {
  const targetEl = state.modal.watchedFeed;
  const link = targetEl.querySelector('a');
  link.classList.remove('fw-bold');
  link.classList.add('fw-normal', 'link-secondary');
};
