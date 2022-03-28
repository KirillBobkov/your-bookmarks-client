import React from 'react';

import Cards from './components/Cards';
import Footer from './components/Footer';
import Form from './components/Form/Form';
import Header from './components/Header';
import Main from './components/Main';

const App = (): JSX.Element => (
  <>
    <Header />
    <Main>
      <Cards />
    </Main>
    <Footer />
    <Form />
  </>
);

export default App;
