import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        color: '#cccccc',
        paddingTop: 80,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
});

export default function NoMatch() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the app</Link>
            </p>
        </div>
    );
}
