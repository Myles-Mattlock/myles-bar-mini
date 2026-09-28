import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@myles-zebar/ui/theme.css';
import '@myles-zebar/ui/index.css';
import '@myles-zebar/ui/fonts.css';
import App from './App';
import { ConfigProvider } from '@myles-zebar/config';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </StrictMode>
);
