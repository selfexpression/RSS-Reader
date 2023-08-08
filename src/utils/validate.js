import * as yup from 'yup';

export default (data, state) => {
  yup.setLocale({
    string: {
      url: () => 'validationURL',
    },
  });

  const uploadedRSS = state.data.feeds.map((feed) => feed.link);

  const scheme = yup.object().shape({
    url: yup.string().url().notOneOf(uploadedRSS, 'duplicate'),
  });

  return scheme.validate(data, { abortEarly: false })
    .then(({ url }) => Promise.resolve(url));
};
