import React from 'react';
import ReactDOM from 'react-dom';

import * as helpers from './App.helpers';
import App from './App';
import * as url from 'url';

describe('App', () => {
    beforeEach(() => {
        helpers.loadEntries = jest.fn(async () => await []);
        helpers.loadFileLink = jest.fn(async () => await []);
    });

    xit('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });
});
