import {
    AppBar,
    Dialog,
    IconButton,
    Slide,
    SlideProps,
    Toolbar,
    Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import _ from 'lodash';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Loader from 'components/Loader';
import Viewer from 'components/Viewer';
import * as Repository from 'repositories/Dropbox';
import { File } from 'types';
import * as log from 'utils/Logger';
import { deleteParam } from 'utils/SearchParams';
import SearchQuery from 'utils/SearchQuery';

const Transition = forwardRef((props: SlideProps, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));
Transition.displayName = 'Transition';

export default function ViewerDialog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [file, setFile] = useState({ name: '', link: '' });
    const query = new SearchQuery('f').get(searchParams);
    const isOpen = !_.isEmpty(query);

    const load = useCallback(() => {
        if (isOpen) {
            log.debug(
                'ViewerDialog: Query has changed, loading data from api...',
            );
            setLoading(true);
            Repository.loadFile(query).then(handleFileLoaded);
        }
    }, [isOpen, query]);

    useEffect(() => {
        load();
    }, [load]);

    const handleClose = (): void => {
        log.debug('ViewerDialog: Closing dialog...');
        setSearchParams(deleteParam(searchParams, 'f'));
    };

    const handleFileLoaded = (f: File) => {
        setFile(f);
        setLoading(false);
    };

    return (
        <Dialog
            fullScreen
            keepMounted
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
