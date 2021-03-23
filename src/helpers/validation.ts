const validateField = (data: any): any => {
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

interface Errors {
  title: string;
  link: string;
}
    
export default validateField;
