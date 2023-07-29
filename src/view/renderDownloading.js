export default (elements, i18n) => {
  const messageEl = document.querySelector('.feedback');
  elements.form.input.value = '';

  messageEl.classList.remove('text-danger');
  messageEl.classList.add('text-info');
  messageEl.textContent = i18n.t('processing.loading');

  elements.form.input.focus();
};
