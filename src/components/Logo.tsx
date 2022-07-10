import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import logo from '../logo.jpg';

const useStyles = makeStyles({
    root: { marginRight: 16 },
});

export default function Logo(): JSX.Element {
    const classes = useStyles();
    return <Avatar alt="Logo" className={classes.root} src={logo} />;
}
