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
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Loader from './Loader';
import Viewer from './Viewer';
import * as Repository from '../repositories/Dropbox';
import * as types from '../types';
import { deleteParam } from '../utils/SearchParams';
import SearchQuery from '../utils/SearchQuery';
import _ from 'lodash';

const Transition = (props: TransitionProps) => (
    <Slide direction="up" {...props} />
);

export default function ViewerDialog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [file, setFile] = useState({ name: '', link: '' });
    const query = new SearchQuery('f').get(searchParams);
    const isOpen = !_.isEmpty(query);

    const load = useCallback(() => {
        if (isOpen) {
            Repository.loadFile(query).then(handleFileLoaded);
        }
    }, [isOpen, query]);

    useEffect(() => {
        load();
    }, [load]);

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
