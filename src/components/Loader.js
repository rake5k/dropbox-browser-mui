import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    progress: {
        left: 0,
        margin: `80px auto`,
        position: 'absolute',
        right: 0,
    },
});

function Loader({ classes }) {
    return (
        <CircularProgress className={classes.progress} />
    )
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
