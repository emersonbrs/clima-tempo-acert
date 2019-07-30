import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/global';

import Main from './pages/Main';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Main />
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </Provider>
  );
}

export default App;
