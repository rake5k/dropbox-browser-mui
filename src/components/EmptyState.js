import { withStyles } from '@material-ui/core/styles';
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
        width: 128,
    },
});

function EmptyState({ classes, description, Icon }) {
    return (
        <div className={classes.emptyState}>
            <Icon className={classes.icon} />
            <div>{description}</div>
        </div>
    );
}

EmptyState.propTypes = {
    classes: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    Icon: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmptyState);
