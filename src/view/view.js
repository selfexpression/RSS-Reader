import onChange from 'on-change';

export default (elements, state) => {
  const watchedState = onChange(state, () => {

  });

  return watchedState;
};
