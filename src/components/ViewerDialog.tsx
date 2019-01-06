import {
    AppBar,
    Dialog,
    IconButton,
    Slide,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { SlideProps } from '@material-ui/core/Slide';
import { Close } from '@material-ui/icons';
import { Location } from 'history';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import Viewer from './Viewer';
import * as helpers from '../App.helpers';
import * as types from '../common/types';

const initialState = {
    file: {
        link: '',
        name: '',
    },
    isLoading: true,
    open: false,
};

function Transition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}

interface ViewerDialogProps {
    readonly location: Location;
}

interface ViewerDialogState {
    file: types.File;
    isLoading: boolean;
    open: boolean;
}

export default class ViewerDialog extends Component<
    ViewerDialogProps,
    ViewerDialogState
> {
    isCancelled: boolean;

    constructor(props: ViewerDialogProps) {
        super(props);
        this.isCancelled = false;
        this.state = initialState;
    }

    componentDidMount = (): void => {
        this.load(this.props.location.pathname);
    };

    componentWillReceiveProps = (nextProps: ViewerDialogProps): void => {
        this.load(nextProps.location.pathname);
    };

    componentWillUnmount = (): void => {
        this.isCancelled = true;
    };

    handleClose = (): void => {
        this.resetState();
    };

    load = (path: string): void => {
        helpers.loadEntryType(path).then(type => {
            if (type === 'file') {
                this.open();
                helpers.loadFile(path).then(file => {
                    this.setFile(file);
                    this.setState({ isLoading: false });
                });
            } else {
                this.resetState();
            }
        });
    };

    open = (): void => {
        if (!this.state.open && !this.isCancelled) {
            this.setState({ open: true });
        }
    };

    setFile = (file: types.File): void => {
        if (!this.isCancelled) {
            this.setState({ file });
        }
    };

    resetState = (): void => {
        if (!this.isCancelled) {
            this.setState(initialState);
        }
    };

    render = (): JSX.Element => {
        const parentPath = this.props.location.pathname
            .split('/')
            .slice(0, -1)
            .join('/');
        const link = (itemProps: any): JSX.Element => (
            <Link to={parentPath} {...itemProps} />
        );

        return (
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Close"
                            component={link}
                            onClick={this.handleClose}
                        >
                            <Close />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            {this.state.file.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {this.state.isLoading ? (
                    <Loader />
                ) : (
                    <Viewer file={this.state.file.link} />
                )}
            </Dialog>
        );
    };
}
