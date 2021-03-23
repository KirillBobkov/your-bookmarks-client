
import React from 'react';
import classnames from 'classnames';

import './Input.scss';

const Input = ({
 name, onChange, value, classes, errorMessage, label, isDisabled,
}: Props): JSX.Element => {
  const handleOnchange = (e: any): void => {
    onChange(e.target.value);
  };

  return (
    <label className="input__label" htmlFor={name}>
      {label}
      <input
        name={name}
        placeholder={name}
        value={value}
        onChange={(e): void => handleOnchange(e)}
        disabled={isDisabled}
        className={classnames({
        input: true,
        [`${classes}`]: !!classes,
        'input--red': !!errorMessage,
      })}
      />
      {errorMessage && <p className="input__error">{errorMessage}</p>}
    </label>
  );
};

Input.defaultProps = {
  classes: '',
  errorMessage: '',
  label: '',
  isDisabled: false,
};

interface Props {
    name: string;
    onChange: (e: any) => void;
    value: string;
    classes?: string;
    errorMessage?: string;
    label?: string;
    isDisabled?: boolean;
  }

export default Input;
