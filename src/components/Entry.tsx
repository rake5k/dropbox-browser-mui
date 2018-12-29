import { Avatar, ListItem, ListItemText } from '@material-ui/core';
import { lightGreen, lime } from '@material-ui/core/colors';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Folder, InsertDriveFile as File } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import * as types from '../common/types';

const styles = {
    file: { backgroundColor: lightGreen[600] },
    folder: { backgroundColor: lime[700] },
};

interface EntryProps extends types.Entry, WithStyles<typeof styles> {
    readonly date?: string;
}

function Entry(props: EntryProps): JSX.Element {
    const link = (itemProps: any): JSX.Element => (
        <Link to={props.path} {...itemProps} />
    );

    return (
        <ListItem button component={link}>
            <Avatar className={props.classes[props.type]}>
                {props.type === 'file' ? <File /> : <Folder />}
            </Avatar>
            <ListItemText
                primary={props.name}
                secondary={props.date && moment(props.date).format('LLL')}
            />
        </ListItem>
    );
}

export default withStyles(styles)(Entry);
