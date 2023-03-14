import * as Yup from 'yup';

const requiredString = (fieldName) => Yup.string().required(`The ${fieldName} is required`);

const url = (fieldName) => Yup.string().url(`The ${fieldName} URL is not valid`);

const stringOrArray = (fieldName) =>
  Yup.mixed().test({
    name: 'stringOrArray',
    exclusive: true,
    message: `The ${fieldName} is required`,
    test: (value) => {
      if (typeof value === 'string') {
        return value.length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return false;
    },
  });

const emailValidation = (fieldName) =>
  Yup.string().required(`Please enter ${fieldName}`).email(`Please enter a valid ${fieldName}`);

const passwordValidation = (fieldName) =>
  Yup.string()
    .required(`Please enter ${fieldName}`)
    .min(6, `${fieldName} must be at least 6 characters`);

const phoneValidation = (fieldName) =>
  Yup.string().matches(
    /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    `Please enter a valid ${fieldName}`
  );

export {
  Yup,
  requiredString,
  stringOrArray,
  url,
  emailValidation,
  passwordValidation,
  phoneValidation,
};
