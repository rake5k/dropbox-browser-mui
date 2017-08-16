import React, { Component } from 'react';

import EntryList from './components/EntryList';
import SimpleAppBar from './components/SimpleAppBar';
import ViewerDialog from './components/ViewerDialog';
import './App.css';
import * as helpers from './App.helpers';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: null,
            fileLink: null,
            fileName: null,
            path: '',
        }
    }

    componentDidMount() {
        helpers.loadEntries(this.state.path)
            .then(entries => this.setState({ entries }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.path !== prevState.path) {
            helpers.loadEntries(this.state.path)
                .then(entries => this.setState({ entries }));
        }
    }

    render() {
        return (
            <div>
                <SimpleAppBar title={process.env.REACT_APP_TITLE} />
                <EntryList
                    entries={this.state.entries}
                    onFileClick={this.handleFileClick.bind(this)}
                    onFolderClick={this.handleFolderClick.bind(this)}
                />
                <ViewerDialog fileLink={this.state.fileLink} fileName={this.state.fileName} />
            </div>
        );
    }

    handleFileClick(path) {
        helpers.loadFileLink(path)
            .then(file => {
                this.setState({
                    fileLink: file.link,
                    fileName: file.metadata.name,
                })
            });
    }

    handleFolderClick(path) {
        this.setState({ entries: null, path });
    }

}

export default App;
