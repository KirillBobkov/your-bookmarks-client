import { IPartialCard } from '../interfaces/ICard';

interface Errors {
  title: string;
  link: string;
}

const validateField = (data: IPartialCard): Errors => {
  const errors: Errors = {
    title: '',
    link: '',
  };

  if (!data.title || !data.title.trim()) {
    errors.title = 'Title cannot be empty';
  }

  if (!data.link || !data.link.trim()) {
    errors.link = 'Link field cannot be empty';
  }

  return errors;
};

    
export default validateField;
