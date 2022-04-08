import React, { ChangeEvent } from 'react';

import './Toggle.scss';

interface Props {
  checked: boolean;
  onToggle: (flag: boolean) => void;
  classes?: string;
}

const Toggle = ({ checked, onToggle, classes }: Props): JSX.Element => (
  <div className={`toggle__container ${classes}`}>
    <input 
      checked={checked} 
      onChange={(e: ChangeEvent<HTMLInputElement>): void => { onToggle(e.target.checked); }} 
      type="checkbox" 
      name="toggle" 
      id="toggle__button" 
      className="toggle__button"
    />
    {/* eslint-disable-next-line */}
    <label htmlFor="toggle__button" className="toggle__label">Show favorite</label>
  </div>
);

export default Toggle;
