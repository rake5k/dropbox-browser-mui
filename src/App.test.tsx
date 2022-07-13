import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

jest.mock('./repositories/Dropbox');

describe('App', () => {
    it('renders without crashing', () => {
        process.env.REACT_APP_TITLE = 'Dropbox Browser test';
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
});
