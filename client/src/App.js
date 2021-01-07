import React from 'react';

import Router from './Router';
import Header from './components/Header';
import AuthProvider from './components/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Router />
      </div>
    </AuthProvider>
  );
};

export default App;
