import Avatar from 'material-ui/Avatar';
import { lightGreen, lime } from 'material-ui/colors';
import { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import FolderIcon from 'material-ui-icons/Folder';
import FileIcon from 'material-ui-icons/InsertDriveFile';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    file: { backgroundColor: lightGreen[600] },
    folder: { backgroundColor: lime[700] },
});

function Entry(props) {
    const { classes, name, path, type } = props;

    return (
        <ListItem button component="a" href={path}>
            <Avatar className={classes[type]}>
                {type === 'file' ? <FileIcon /> : <FolderIcon />}
            </Avatar>
            <ListItemText primary={name} secondary="Datum" />
        </ListItem>
    );
}

Entry.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['file', 'folder']),
};

export default withStyles(styles)(Entry);
