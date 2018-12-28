import Avatar from '@material-ui/core/Avatar';
import { lightGreen, lime } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Folder, InsertDriveFile as File } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = theme => ({
    file: { backgroundColor: lightGreen[600] },
    folder: { backgroundColor: lime[700] },
});

function Entry(props) {
    const { classes, date, name, path, type } = props;

    return (
        <ListItem button component={Link} to={path}>
            <Avatar className={classes[type]}>
                {type === 'file' ? <File /> : <Folder />}
            </Avatar>
            <ListItemText
                primary={name}
                secondary={date && moment(date).format('LLL')}
            />
        </ListItem>
    );
}

Entry.propTypes = {
    classes: PropTypes.object.isRequired,
    date: PropTypes.string,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['file', 'folder']),
};

export default withStyles(styles)(Entry);
