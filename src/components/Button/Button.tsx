import React from 'react';
import classnames from 'classnames';

import './Button.scss';

const Button = ({ capture, mode, onClick }: Props): JSX.Element => (
  <button
    onClick={onClick}
    type="button" 
    className={classnames({
      button: true,
      [`button--${mode}`]: !!mode,
    })}
  >
    {capture}
  </button>
);

Button.defaultProps = {
  mode: '',
};

interface Props {
  capture: string;
  mode?: string;
  onClick: (e: any) => void;
}

export default Button;
