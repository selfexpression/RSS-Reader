export default (elements, state) => {
  if (!state.error) {
    elements.form.input.classList.remove('is-invalid');
  } else {
    elements.form.input.classList.add('is-invalid');
  }

  elements.form.formEl.reset();
  elements.form.input.focus();
};
