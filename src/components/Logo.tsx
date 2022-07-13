import { Avatar, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import logo from '../assets/logo.jpg';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginRight: theme.spacing(2),
    },
}));

export default function Logo() {
    const classes = useStyles();
    return <Avatar alt="Logo" className={classes.root} src={logo} />;
}
