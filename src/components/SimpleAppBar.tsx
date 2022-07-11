import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './Logo';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
    },
});

interface Props {
    title: string;
}

export default function SimpleAppBar(props: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Typography variant="h6" color="inherit">
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
