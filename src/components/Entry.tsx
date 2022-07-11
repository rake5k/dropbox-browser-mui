import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { lightGreen, lime } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Folder, InsertDriveFile as File } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import * as types from '../common/types';
import { appendParam } from '../utils/SearchParams';

const useStyles = makeStyles({
    file: { backgroundColor: lightGreen[600] },
    folder: { backgroundColor: lime[700] },
});

interface EntryProps extends types.Entry {
    readonly date?: string;
}

export default function Entry(props: EntryProps): JSX.Element {
    const classes = useStyles();

    const link = (itemProps: any): JSX.Element => {
        if (props.type === 'file') {
            const [searchParams] = useSearchParams();
            const params = appendParam(searchParams, 'f', props.path);
            return <Link to={`?${params}`} {...itemProps} />;
        } else {
            return <Link to={`/browse${props.path}`} {...itemProps} />;
        }
    };

    return (
        <ListItem button component={link}>
            <ListItemAvatar>
                <Avatar className={classes[props.type]}>
                    {props.type === 'file' ? <File /> : <Folder />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={props.date && moment(props.date).format('LLL')}
            />
        </ListItem>
    );
}
