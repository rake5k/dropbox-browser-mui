import _ from 'lodash';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import React from 'react';

function Entry(props) {
    const { name, path, type } = props;
    const onClick = props[`on${_.upperFirst(type)}Click`];

    return (
        <ListItem button onClick={() => onClick(path)}>
            <Avatar>
                {type === 'file' ? <FileDownloadIcon /> : <FolderIcon />}
            </Avatar>
            <ListItemText primary={name} secondary="Datum" />
        </ListItem>
    );
}

Entry.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['file', 'folder'])
};

export default Entry;
