import React from 'react';

import Cards from './components/Cards';
import Form from './components/Form/Form';
import Header from './components/Header';
import Main from './components/Main';

const App = (): JSX.Element => (
  <>
    <Header />
    <Main>
      <Cards />
    </Main>
    <Form />
  </>
);

export default App;
