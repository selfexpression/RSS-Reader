export default (elements, error, prevError, i18n) => {
  const errorEl = document.querySelector('.feedback');

  elements.form.input.classList.add('is-invalid');
  errorEl.classList.remove('text-info', 'text-success');
  errorEl.classList.add('text-danger');

  errorEl.textContent = error !== null
    ? i18n.t(`errors.${error}`)
    : i18n.t(`errors.${prevError}`);
};
