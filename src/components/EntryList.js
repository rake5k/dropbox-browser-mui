import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import Entry from './Entry';
import Loader from './Loader';

const styles = theme => ({
    root: {
        background: theme.palette.background.paper,
        paddingTop: 80,
        width: '100%',
    },
});

function EntryList({ classes, entries, onFileClick, onFolderClick }) {
    if (!entries) {
        return <Loader />;
    }

    if (!entries.length) {
        return <p>...empty</p>;
    }

    return (
        <List className={classes.root}>
            {entries.map((entry, index) => (
                <Entry
                    {...entry}
                    key={index}
                    onFileClick={onFileClick}
                    onFolderClick={onFolderClick}
                />
            ))}
        </List>
    )
}

EntryList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntryList);
