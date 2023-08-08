export default (elements, value, prevValue, i18n) => {
  const errorEl = document.querySelector('.feedback');

  elements.input.classList.add('is-invalid');
  errorEl.classList.remove('text-info', 'text-success');
  errorEl.classList.add('text-danger');

  errorEl.textContent = value !== null
    ? i18n.t(`errors.${value}`)
    : i18n.t(`errors.${prevValue}`);
};
