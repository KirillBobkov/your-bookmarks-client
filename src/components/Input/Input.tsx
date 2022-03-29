import React, { ChangeEvent } from 'react';
import classnames from 'classnames';

import './Input.scss';

interface Props {
  name: string;
  onChange: (value: string) => void;
  value: string;
  classes?: string;
  errorMessage?: string;
  label?: string;
  isDisabled?: boolean;
  placeholder?: string;
}

const Input = ({
  name, onChange, value, classes = '', errorMessage = '', 
  label = '', isDisabled = false, placeholder = 'Start typing',
}: Props): JSX.Element => {
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>): void => onChange(e.target.value);

  return (
    <label className="input__label" htmlFor={name}>
      <span>{label}</span>
      <div className="input__container">
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleOnchange}
          disabled={isDisabled}
          className={classnames({
            input: true,
            [`${classes}`]: !!classes,
            'input--red': !!errorMessage,
          })}
        />
        <div className="input__cross-button" onClick={(): void => onChange('')}>✖</div>
      </div>
      {errorMessage && <p className="input__error">{errorMessage}</p>}
    </label>
  );
};

export default Input;
