import onChange from 'on-change';

const renderError = (elements, state) => {
  const { input } = elements.form;
  const { error } = state;

  if (!error) {
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
      case 'error': {
        renderError(elements, state);
        break;
      }
      default:
        break;
    }
  });

  return watchedState;
};
