import React from 'react';

import Cards from './components/Cards';
import Footer from './components/Footer';
import Form from './components/Form/Form';
import Header from './components/Header';

const App = (): JSX.Element => (
  <>
    <Header />
    <Cards />
    <Footer />
    <Form />
  </>
  );

export default App;
