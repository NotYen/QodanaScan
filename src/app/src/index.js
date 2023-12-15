import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistor, store } from './store';

/* import context function */
import { AuthContext } from './context/AuthContext';
import { MissionContext } from './context/MissionContext';

import App from './App';

import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: 'e7863f942c19e77f6f4c9aaae600c9a4',
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react')
  .createErrorBoundary(React)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
        <BrowserRouter basename={ process.env.PUBLIC_URL }>
            <ErrorBoundary>
            <AuthContext.Provider>
                <MissionContext.Provider>
                <Provider store={ store }>
                    <PersistGate persistor={ persistor }>
                        <App />
                    </PersistGate>
                </Provider>
                </MissionContext.Provider>
            </AuthContext.Provider>
            </ErrorBoundary>
        </BrowserRouter>
    // </React.StrictMode>
);
