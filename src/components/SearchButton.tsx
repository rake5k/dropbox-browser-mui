import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close, Search } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
});

interface Props {
    isActive: boolean;
}

export default function SearchButton(props: Props) {
    const classes = useStyles();
    const moveUp = props.isActive ? { bottom: 76 } : {};

    const link = (itemProps: any): JSX.Element => (
        <Link to={props.isActive ? '/' : '/search'} {...itemProps} />
    );

    return (
        <Fab
            color="primary"
            aria-label="search"
            className={classes.button}
            component={link}
            style={moveUp}
        >
            {props.isActive ? <Close /> : <Search />}
        </Fab>
    );
}
