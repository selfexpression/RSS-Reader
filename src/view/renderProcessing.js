const renderDownloading = (elements, i18n) => {
  const { input } = elements;
  const messageEl = document.querySelector('.feedback');
  input.value = '';

  messageEl.classList.remove('text-danger');
  messageEl.classList.add('text-info');
  messageEl.textContent = i18n.t('processing.loading');

  input.focus();
};

const renderSucccess = (elements, i18n) => {
  const { input } = elements;
  const messageEl = document.querySelector('.feedback');
  input.value = '';

  input.classList.remove('is-invalid');
  messageEl.classList.remove('text-danger');
  messageEl.classList.remove('text-info');
  messageEl.classList.add('text-success');
  messageEl.textContent = i18n.t('processing.loaded');

  input.focus();
};

export default (elements, value, i18n) => {
  const { button, input } = elements;

  switch (value) {
    case 'FILLING':
      button.disabled = false;
      input.disabled = false;
      break;
    case 'LOADING':
      renderDownloading(elements, i18n);
      button.disabled = true;
      input.disabled = true;
      break;
    case 'LOADED':
      renderSucccess(elements, i18n);
      button.disabled = false;
      input.disabled = false;
      break;
    default:
      break;
  }
};
