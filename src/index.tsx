import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'App';
import * as serviceWorker from 'serviceWorker';

import 'index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
