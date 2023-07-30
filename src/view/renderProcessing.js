import renderDownloading from './renderDownloading.js';
import renderSucccess from './renderSuccess.js';

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
