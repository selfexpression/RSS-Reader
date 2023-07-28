export default (elements, state) => {
  const errorEl = document.querySelector('.feedback');

  if (state.messages.error) {
    elements.form.input.classList.add('is-invalid');
    errorEl.classList.remove('text-success');
    errorEl.classList.add('text-danger');
    errorEl.textContent = state.messages.error;
  } else {
    elements.form.input.classList.remove('is-invalid');
    errorEl.classList.remove('text-danger');
    errorEl.classList.add('text-success');
    errorEl.textContent = state.messages.success;
  }
};
