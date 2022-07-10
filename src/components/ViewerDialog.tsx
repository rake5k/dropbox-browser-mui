import {
    AppBar,
    Dialog,
    IconButton,
    Slide,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Loader from './Loader';
import Viewer from './Viewer';
import { getSearchQuery, isSearchQueryEmpty } from './ViewerDialog.helpers';
import * as helpers from '../App.helpers';
import * as types from '../common/types';
import { deleteParam } from '../utils/SearchParams';

function Transition(props: TransitionProps) {
    return <Slide direction="up" {...props} />;
}

export default function ViewerDialog(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [file, setFile] = useState({ name: '', link: '' });
    const isOpen = !isSearchQueryEmpty(searchParams);

    useEffect(() => {
        load();
    }, [getSearchQuery(searchParams)]);

    const load = (): void => {
        if (isOpen) {
            helpers
                .loadFile(getSearchQuery(searchParams))
                .then(handleFileLoaded);
        }
    };

    const handleClose = (): void => {
        setSearchParams(deleteParam(searchParams, 'f'));
        resetState();
    };

    const handleFileLoaded = (f: types.File) => {
        setFile(f);
        setLoading(false);
    };

    const resetState = (): void => {
        setLoading(true);
        setFile({ name: '', link: '' });
    };

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar position="relative">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Close"
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {file.name}
                    </Typography>
                </Toolbar>
            </AppBar>
            {isLoading ? <Loader /> : <Viewer file={file.link} />}
        </Dialog>
    );
}
