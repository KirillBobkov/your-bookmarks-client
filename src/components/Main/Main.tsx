import React, { ReactChild } from 'react';

import './Main.scss';

const Main = ({ children }: { children: ReactChild }): JSX.Element => (
  <main className="main">
    {children}
  </main>
);

export default Main;
