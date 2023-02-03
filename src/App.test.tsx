import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, it, vi } from 'vitest';

import App from './App';

vi.mock('./repositories/Dropbox');

describe('App', () => {
    it('renders without crashing', () => {
        import.meta.env.VITE_APP_TITLE = 'Dropbox Browser test';
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
