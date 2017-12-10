import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { withStyles } from 'material-ui/styles';
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
        fontSize: '128pt',
        margin: 40,
    },
});

function SearchEmptyState({ classes }) {
    return (
        <div className={classes.emptyState}>
            <FontAwesomeIcon className={classes.icon} icon={faSearch} />
            <div>Begin typing to start the search</div>
        </div>
    );
}

SearchEmptyState.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchEmptyState);
