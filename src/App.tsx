import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import EntryList, { context as browseContext } from './components/EntryList';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import Search, { context as searchContext } from './components/Search';

const theme = createTheme({
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
});

export default function App(): JSX.Element {
    return (
        <Router>
            <MuiThemeProvider theme={theme}>
                <div>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route
                                index
                                element={
                                    <Navigate to={browseContext} replace />
                                }
                            />
                            <Route path={browseContext} element={<EntryList />}>
                                <Route index element={<EntryList />} />
                                <Route path=":path/*" element={<EntryList />} />
                            </Route>
                            <Route path={searchContext} element={<Search />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                    </Routes>
                </div>
            </MuiThemeProvider>
        </Router>
    );
}
