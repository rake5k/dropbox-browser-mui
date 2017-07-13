import React from 'react';

import EntryList from './components/EntryList';
import './App.css';
import * as helpers from './App.helpers';
import logo from './logo.svg';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: null,
            isPreview: false,
            path: ''
        }
    }

    componentDidMount() {
        helpers.loadEntries(this.state.path)
            .then((entries) => this.setState({ entries }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.path !== prevState.path) {
            helpers.loadEntries(this.state.path)
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
        helpers.loadFileLink(path)
            .then(console.log);
    }

    handleFolderClick(path) {
        this.setState({ entries: null, path });
    }

}

export default App;
