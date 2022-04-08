import _ from 'lodash';
import { IPartialCard } from '../interfaces/ICard';

interface Errors {
  title: string;
  link: string;
  previewSrc: string;
}

const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
const linkRegExp = new RegExp(expression);

const validateField = (data: IPartialCard): Errors => {
  const errors: Errors = {
    title: '',
    link: '',
    previewSrc: '',
  };

  Object.entries(data).forEach(([key, value]): void => {
    if (!value || !value.trim()) {
      errors[key as keyof Errors] = 'Field cannot be empty';
    }
  });
  
  if (!linkRegExp.test(data.link.trim())) {
    errors.link = 'Check that the link is correct and starts with http / https';
  }

  if (!linkRegExp.test(data.previewSrc.trim())) {
    errors.previewSrc = 'Check that the preview source image is correct';
  }

  return errors;
};
    
export default validateField;
