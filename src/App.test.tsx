import React from 'react';
import ReactDOM from 'react-dom';

import * as helpers from './App.helpers';
import App from './App';

describe('App', () => {
    beforeEach(() => {
        helpers.loadEntries = jest.fn(async () => await []);
        helpers.loadFile = jest.fn(async () => await []);
    });

    it('renders without crashing', () => {
        process.env.REACT_APP_TITLE = 'Dropbox Browser test';
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
});
