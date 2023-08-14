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

const renderError = (elements, state, i18n) => {
  const errorEl = document.querySelector('.feedback');

  elements.input.classList.add('is-invalid');
  errorEl.classList.remove('text-info', 'text-success');
  errorEl.classList.add('text-danger');

  const mapping = {
    validationError: (value) => i18n.t(`errors.${value}`),
    duplicateError: (value) => i18n.t(`errors.${value}`),
    RSSError: (value) => i18n.t(`errors.${value}`),
    AxiosError: (value) => i18n.t(`errors.${value}`),
  };

  const errorValue = state.error;

  errorEl.textContent = mapping[errorValue](errorValue);
};

export default (elements, state, value, i18n) => {
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
    case 'ERROR':
      renderError(elements, state, i18n);
      button.disabled = false;
      input.disabled = false;
      break;
    default:
      break;
  }
};
