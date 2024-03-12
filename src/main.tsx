import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider, AdaptivityProvider } from '@vkontakte/vkui';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
);
