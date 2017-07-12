import _ from 'lodash';
import React, { Component } from 'react';
import Dropbox from 'dropbox';

import EntryList from './components/EntryList';
import './App.css';
import logo from './logo.svg';

const dbx = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN });

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: null,
            isPreview: false,
            path: ''
        }
    }

    componentDidMount() {
        loadEntries(this.state.path)
            .then((entries) => this.setState({ entries }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.path !== prevState.path) {
            loadEntries(this.state.path)
                .then((entries) => this.setState({ entries }));
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <EntryList
                        entries={this.state.entries}
                        onFileClick={this.handleFileClick}
                        onFolderClick={this.handleFolderClick.bind(this)}
                    />
                </div>
            </div>
        );
    }

    handleFileClick(path) {
        dbx.filesGetTemporaryLink({ path })
            .then(console.log);
    }

    handleFolderClick(path) {
        this.setState({ entries: null, path });
    }

}

export default App;

async function loadEntries(path) {
    if (!process.env.REACT_APP_DROPBOX_ACCESS_TOKEN) {
        throw new Error('Dropbox Access Token required');
    }

    try {
        const { entries } = await dbx.filesListFolder({ path });
        return _.map(entries, (entry) => ({
            name: entry.name,
            path: entry.path_display,
            type: entry['.tag']
        }));
    } catch (error) {
        console.log(error);
    }
}
