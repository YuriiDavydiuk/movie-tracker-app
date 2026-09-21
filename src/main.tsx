import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/reset.css';
import App from './components/App/App.tsx';
import { ModalProvider } from './context/ModalContext/ModalProvider.tsx';
import { MoviesProvider } from './context/MoviesContext/MoviesProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </MoviesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
