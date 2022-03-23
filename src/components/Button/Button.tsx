import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

import './Button.scss';

const Button = ({
  text, mode, onClick, ...attrs 
}: Props): JSX.Element => (
  <button
    onClick={onClick}
    type="button" 
    className={classnames({
      button: true,
      [`button--${mode}`]: !!mode,
    })}
    {...attrs}
  >
    { text}
  </button>
);

Button.defaultProps = {
  mode: '',
};

interface Props extends HTMLAttributes<HTMLButtonElement> {
   text: string;
  mode?: string;
  onClick: (e: any) => void;
}

export default Button;
