import React from 'react';

import './Spinner.scss';

const Spinner = (): JSX.Element => (
  <div className="lds-wrapper">
    <div className="lds-heart">
      <div />
    </div>
  </div>
);

export default Spinner;
