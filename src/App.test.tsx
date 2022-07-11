import React from 'react';
import ReactDOM from 'react-dom';

import * as Repository from './repositories/Dropbox';
import App from './App';

describe('App', () => {
    beforeEach(() => {
        Repository.loadEntries = jest.fn(async () => await []);
        Repository.loadFile = jest.fn(async () => await []);
    });

    it('renders without crashing', () => {
        process.env.REACT_APP_TITLE = 'Dropbox Browser test';
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
});
