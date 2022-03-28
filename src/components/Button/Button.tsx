import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

import './Button.scss';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  mode?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: any) => void;
}

const Button = ({
  text, mode = '', onClick, type, ...attrs 
}: Props): JSX.Element => (
  <button
    onClick={onClick}
    className={classnames({
      button: true,
      [`button--${mode}`]: !!mode,
    })}
    type={type ?? 'button'}
    {...attrs}
  >
    {text}
  </button>
);

export default Button;
