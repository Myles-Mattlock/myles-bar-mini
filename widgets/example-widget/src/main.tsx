import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from '@myles-zebar/config';
import '@myles-zebar/ui/theme.css';
import '@myles-zebar/ui/index.css';
import '@myles-zebar/ui/fonts.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
