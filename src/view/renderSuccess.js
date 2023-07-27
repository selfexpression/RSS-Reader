export default (elements, state) => {
  const errorEl = document.querySelector('.feedback');

  elements.form.input.classList.remove('is-invalid');
  errorEl.classList.remove('text-danger');
  errorEl.classList.add('text-success');
  errorEl.textContent = state.messages.success;
};
