import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import EntryList from './components/EntryList';
import Search from './components/Search';
import SimpleAppBar from './components/SimpleAppBar';
import ViewerDialog from './components/ViewerDialog';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#99d066',
            main: '#689f38',
            dark: '#387002',
        },
        secondary: {
            light: '#99d066',
            main: '#689f38',
            dark: '#387002',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <div>
                    <SimpleAppBar title={process.env.REACT_APP_TITLE} />
                    <Route exact path="/">
                        <EntryList />
                    </Route>
                    <Route path="/:path">
                        <EntryList />
                    </Route>
                    <Route path="/:path">
                        <ViewerDialog />
                    </Route>
                    <Route>
                        <Search />
                    </Route>
                </div>
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

export default App;
