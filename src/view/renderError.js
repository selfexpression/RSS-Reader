export default (elements, state) => {
  const errorEl = document.querySelector('.feedback');

  elements.form.input.classList.add('is-invalid');
  errorEl.classList.remove('text-success');
  errorEl.classList.add('text-danger');
  errorEl.textContent = state.messages.error;
};
