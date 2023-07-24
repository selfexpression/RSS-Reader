import onChange from 'on-change';

const renderError = (elements, state) => {
  const { input } = elements.form;
  const { errors } = state;
  if (errors.length === 0) {
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
  }

  elements.form.formEl.reset();
  input.focus();
};

export default (elements, state) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'errors': {
        renderError(elements, state);
        break;
      }
      default:
        break;
    }
  });

  return watchedState;
};
