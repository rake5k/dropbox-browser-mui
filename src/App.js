import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { lightGreen, lime } from 'material-ui/colors';
import red from 'material-ui/colors/red';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import EntryList from './components/EntryList';
import Search from './components/Search';
import SimpleAppBar from './components/SimpleAppBar';
import ViewerDialog from './components/ViewerDialog';
import './App.css';

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

function App() {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <div>
                    <SimpleAppBar title={process.env.REACT_APP_TITLE} />
                    <Route exact path="/" component={EntryList} />
                    <Route path="/:path" component={EntryList} />
                    <Route path="/:path" component={ViewerDialog} />
                    <Route component={Search} />
                </div>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;
