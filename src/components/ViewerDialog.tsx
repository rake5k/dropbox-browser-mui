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
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Loader from './Loader';
import Viewer from './Viewer';
import * as helpers from '../App.helpers';
import * as types from '../common/types';

function Transition(props: PropsWithChildren<TransitionProps>) {
    return <Slide direction="up" {...props} />;
}

export default function ViewerDialog(): JSX.Element {
    const path = useLocation().pathname;
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [file, setFile] = useState({ name: '', link: '' });

    useEffect(() => {
        load();
    }, [path]);

    const load = (): void => {
        helpers.loadEntryType(path).then((type) => {
            if (type === 'file') {
                handleOpen();
                helpers.loadFile(path).then(handleFileLoaded);
            } else {
                resetState();
            }
        });
    };

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        resetState();
    };

    const handleFileLoaded = (f: types.File) => {
        setFile(f);
        setLoading(false);
    };

    const resetState = (): void => {
        setOpen(false);
        setLoading(true);
        setFile({ name: '', link: '' });
    };

    const parentPath = path.split('/').slice(0, -1).join('/');
    const link = (itemProps: any): JSX.Element => (
        <Link to={parentPath} {...itemProps} />
    );

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
                        component={link}
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
