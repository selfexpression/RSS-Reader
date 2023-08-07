const renderDownloading = (elements, i18n) => {
  const messageEl = document.querySelector('.feedback');
  elements.form.input.value = '';

  messageEl.classList.remove('text-danger');
  messageEl.classList.add('text-info');
  messageEl.textContent = i18n.t('processing.loading');

  elements.form.input.focus();
};

const renderSucccess = (elements, i18n) => {
  const messageEl = document.querySelector('.feedback');
  elements.form.input.value = '';

  elements.form.input.classList.remove('is-invalid');
  messageEl.classList.remove('text-danger');
  messageEl.classList.remove('text-info');
  messageEl.classList.add('text-success');
  messageEl.textContent = i18n.t('processing.loaded');

  elements.form.input.focus();
};

export default (elements, value, i18n) => {
  switch (value) {
    case 'FILLING': {
      elements.form.button.disabled = false;
      elements.form.input.disabled = false;
      break;
    }
    case 'LOADING': {
      renderDownloading(elements, i18n);
      elements.form.button.disabled = true;
      elements.form.input.disabled = true;
      break;
    }
    case 'LOADED': {
      renderSucccess(elements, i18n);
      elements.form.button.disabled = false;
      elements.form.input.disabled = false;
      break;
    }
    default:
      break;
  }
};
