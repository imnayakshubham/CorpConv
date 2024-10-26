import ReactDOM from 'react-dom/client'
import './index.css'
import App from "@/App.jsx"
import { persistor, store } from '../store/configSaga.js';

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history"
import { HistoryRouter } from './HistoryRouter.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.js';

export const history = createBrowserHistory()

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <ErrorBoundary>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </QueryClientProvider>
      </PersistGate>
    </ErrorBoundary>
  </Provider >
)
