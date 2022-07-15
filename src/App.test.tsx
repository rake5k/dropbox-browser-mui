import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

jest.mock('./repositories/Dropbox');

describe('App', () => {
    it('renders without crashing', () => {
        process.env.REACT_APP_TITLE = 'Dropbox Browser test';
        const root = ReactDOM.createRoot(
            document.createElement('root') as HTMLElement,
        );
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        );
    });
});
