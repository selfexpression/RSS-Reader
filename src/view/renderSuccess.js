export default (elements, i18n) => {
  const messageEl = document.querySelector('.feedback');
  elements.form.input.value = '';

  elements.form.input.classList.remove('is-invalid');
  messageEl.classList.remove('text-danger');
  messageEl.classList.remove('text-info');
  messageEl.classList.add('text-success');
  messageEl.textContent = i18n.t('processing.loaded');

  elements.form.input.focus();
};
