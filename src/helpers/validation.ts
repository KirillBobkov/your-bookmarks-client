import _ from 'lodash';
import { IPartialCard } from '../interfaces/ICard';

interface Errors {
  title: string;
  link: string;
}

const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const linkRegExp = new RegExp(expression);

const validateField = (data: IPartialCard): Errors => {
  const errors: Errors = {
    title: '',
    link: '',
  };

  if (!data.title || !data.title.trim()) {
    errors.title = 'Title cannot be empty';
  }

  if (!linkRegExp.test(data.link.trim())) {
    errors.link = 'Check that the link is correct';
  }

  if (!data.link || !data.link.trim()) {
    errors.link = 'Link field cannot be empty';
  }

  return errors;
};

    
export default validateField;
