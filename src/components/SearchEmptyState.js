import { withStyles } from 'material-ui/styles';
import SearchIcon from 'material-ui-icons/Search';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    emptyState: {
        color: '#cccccc',
        marginTop: `80px`,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
    icon: {
        height: 128,
        margin: 40,
        width: 128,
    },
});

function SearchEmptyState({ classes }) {
    return (
        <div className={classes.emptyState}>
            <SearchIcon className={classes.icon} />
            <div>Begin typing to start the search</div>
        </div>
    );
}

SearchEmptyState.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchEmptyState);
