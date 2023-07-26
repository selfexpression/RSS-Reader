export default (elements, state) => {
  const errorEl = document.querySelector('.text-danger');

  if (!state.error) {
    elements.form.input.classList.remove('is-invalid');
    errorEl.textContent = '';
  } else {
    elements.form.input.classList.add('is-invalid');
    errorEl.textContent = state.error;
  }

  elements.form.formEl.reset();
  elements.form.input.focus();
};
