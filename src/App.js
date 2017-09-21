import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { lightGreen, lime } from 'material-ui/colors';
import red from 'material-ui/colors/red';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import EntryList from './components/EntryList';
import Search from './components/Search';
import SimpleAppBar from './components/SimpleAppBar';
import ViewerDialog from './components/ViewerDialog';
import './App.css';
import * as helpers from './App.helpers';

const theme = createMuiTheme({
    palette: {
        primary: {
            ...lightGreen,
            500: lightGreen[700],
        },
        secondary: lime,
        error: red,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
        };
    }

    render() {
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <SimpleAppBar title={process.env.REACT_APP_TITLE} />
                        <Route exact path="/" component={EntryList} />
                        <Route path="/browse/:path" component={EntryList} />
                        <Search
                            isActive={this.state.isSearching}
                            onSearch={this.handleSearch.bind(this)}
                            onToggle={this.handleSearchToggle.bind(this)}
                        />
                        <Route exact path="/view" component={ViewerDialog} />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }

    handleSearch(query) {
        this.setState({ entries: null });
        helpers.searchFiles(query).then(entries => this.setState({ entries }));
    }

    handleSearchToggle() {
        this.setState({ isSearching: !this.state.isSearching });
    }
}

export default App;
