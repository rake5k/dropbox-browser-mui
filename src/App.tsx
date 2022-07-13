import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import Browse, { context as browseContext } from 'pages/Browse';
import Layout from 'pages/Layout';
import NoMatch from 'pages/NoMatch';
import Search, { context as searchContext } from 'pages/Search';

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
            <ThemeProvider theme={theme}>
                <div>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route
                                index
                                element={
                                    <Navigate to={browseContext} replace />
                                }
                            />
                            <Route path={browseContext} element={<Browse />}>
                                <Route index element={<Browse />} />
                                <Route path=":path/*" element={<Browse />} />
                            </Route>
                            <Route path={searchContext} element={<Search />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                    </Routes>
                </div>
            </ThemeProvider>
        </Router>
    );
}
