import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
});

function Loader({ classes }) {
    return (
        <CircularProgress className={classes.progress} size={50} />
    )
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
