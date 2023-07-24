import * as yup from 'yup';
import watch from './view/view.js';

const schema = yup.object().shape({
  link: yup.string().url(),
});

export default () => {
  const state = {
    form: {
      link: '',
    },
  };

  const elements = {
    form: document.querySelector('#rss-form'),
  };
console.log(state)
  const watchedState = watch(elements, state);
};
