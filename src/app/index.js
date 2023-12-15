import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistor, store } from './store';

/* import context function */
import { AuthContext } from './context/AuthContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter basename={ process.env.PUBLIC_URL }>
            <AuthContext.Provider>
                <Provider store={ store }>
                    <PersistGate persistor={ persistor }>
                        <App />
                    </PersistGate>
                </Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    </React.StrictMode>
);
