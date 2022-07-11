import { List } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Entry from './Entry';
import * as types from '../types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.paper,
            paddingBottom: 56,
            paddingTop: 80,
            width: '100%',
        },
    }),
);

interface Props {
    entries: types.Entry[];
}

export default function EntryList({ entries }: Props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {entries.map((entry, index) => (
                <Entry {...entry} key={index} />
            ))}
        </List>
    );
}
