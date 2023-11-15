import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/services/store/store';
import { App } from 'src/app/App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </>
);
