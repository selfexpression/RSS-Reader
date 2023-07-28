export default (elements, state) => {
  const messageEl = document.querySelector('.feedback');

  elements.form.input.classList.remove('is-invalid');
  messageEl.classList.remove('text-danger');
  messageEl.classList.add('text-success');
  messageEl.textContent = state.messages.success;
};
