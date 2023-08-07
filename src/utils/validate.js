import * as yup from 'yup';

export default (data) => {
  yup.setLocale({
    string: {
      url: () => 'validationURL',
    },
  });

  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  return schema.validate(data, { abortEarly: false })
    .then(({ url }) => Promise.resolve(url));
};
