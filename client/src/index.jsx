import React from 'react';
import ReactDOM from 'react-dom';
import GlobalProvider from './utils/GlobalContext';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
