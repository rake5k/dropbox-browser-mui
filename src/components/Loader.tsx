import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
    root: {
        left: 0,
        margin: `80px auto`,
        position: 'absolute',
        right: 0,
    },
});

export default function Loader() {
    const classes = useStyles();
    return <CircularProgress className={classes.root} />;
}
