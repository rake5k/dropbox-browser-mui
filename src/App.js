import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import EntryList from './components/EntryList';
import Search from './components/Search';
import SimpleAppBar from './components/SimpleAppBar';
import ViewerDialog from './components/ViewerDialog';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#99d066',
            main: '#689f38',
            dark: '#387002'
        },
        secondary: {
            light: '#99d066',
            main: '#689f38',
            dark: '#387002'
        },
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
